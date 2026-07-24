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

    private var hasRevealedContent = false

    override func viewDidLoad() {
        super.viewDidLoad()

        self.webView.isHidden = true
        self.webView.navigationDelegate = self
        self.webView.configuration.userContentController.add(self, name: "controller")

        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
            DispatchQueue.main.async {
                let enabled = state?.isEnabled ?? false
                self.injectInitialState(enabled: enabled)
                self.webView.loadFileURL(
                    Bundle.main.url(forResource: "Main", withExtension: "html")!,
                    allowingReadAccessTo: Bundle.main.resourceURL!
                )
            }
        }
    }

    override func viewWillAppear() {
        super.viewWillAppear()

        if !self.hasRevealedContent {
            self.view.window?.alphaValue = 0
        }
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        self.revealContent()
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

    private func injectInitialState(enabled: Bool) {
        let useSettings: String
        if #available(macOS 13, *) {
            useSettings = "true"
        } else {
            useSettings = "false"
        }

        let preferredLanguages = Locale.preferredLanguages
            .map { language in
                language
                    .replacingOccurrences(of: "\\", with: "\\\\")
                    .replacingOccurrences(of: "'", with: "\\'")
            }
            .map { "'\($0)'" }
            .joined(separator: ", ")

        let source = """
        window.__INITIAL_ENABLED__=\(enabled ? "true" : "false");
        window.__USE_SETTINGS__=\(useSettings);
        window.__PREFERRED_LANGUAGES__=[\(preferredLanguages)];
        """
        let script = WKUserScript(source: source, injectionTime: .atDocumentStart, forMainFrameOnly: true)
        self.webView.configuration.userContentController.addUserScript(script)
    }

    private func revealContent() {
        guard !self.hasRevealedContent else {
            return
        }

        self.hasRevealedContent = true
        self.webView.isHidden = false
        self.view.window?.alphaValue = 1
    }

}
