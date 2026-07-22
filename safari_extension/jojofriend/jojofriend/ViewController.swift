//
//  ViewController.swift
//  jojofriend
//
//  Created by zhangps on 2026/7/22.
//

import Cocoa
import SafariServices
import WebKit

let extensionBundleIdentifier = "com.leo.jojofriend.Extension"

class ViewController: NSViewController, WKNavigationDelegate, WKScriptMessageHandler {

    @IBOutlet var webView: WKWebView!

    private let contentSizeDisabled = NSSize(width: 400, height: 478)
    private let contentSizeEnabled = NSSize(width: 400, height: 368)

    override func viewDidLoad() {
        super.viewDidLoad()

        self.webView.navigationDelegate = self

        self.webView.configuration.userContentController.add(self, name: "controller")

        self.webView.loadFileURL(Bundle.main.url(forResource: "Main", withExtension: "html")!, allowingReadAccessTo: Bundle.main.resourceURL!)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
            guard let state = state, error == nil else {
                return
            }

            DispatchQueue.main.async {
                if #available(macOS 13, *) {
                    webView.evaluateJavaScript("show(\(state.isEnabled), true)")
                } else {
                    webView.evaluateJavaScript("show(\(state.isEnabled), false)")
                }
                self.resizeWindow(enabled: state.isEnabled)
            }
        }
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if (message.body as! String != "open-preferences") {
            return;
        }

        SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
            DispatchQueue.main.async {
                NSApplication.shared.terminate(nil)
            }
        }
    }

    private func resizeWindow(enabled: Bool) {
        guard let window = view.window else { return }

        let contentSize = enabled ? contentSizeEnabled : contentSizeDisabled
        let contentRect = NSRect(origin: .zero, size: contentSize)
        let targetFrame = window.frameRect(forContentRect: contentRect)
        let currentFrame = window.frame
        let newOrigin = NSPoint(
            x: currentFrame.origin.x,
            y: currentFrame.origin.y + currentFrame.size.height - targetFrame.size.height
        )

        window.setFrame(NSRect(origin: newOrigin, size: targetFrame.size), display: true, animate: false)
    }

}
