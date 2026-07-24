const DEFAULT_LOCALE = "en";
const RTL_LOCALES = ["ar", "he", "fa"];

// Keep in sync with src/js/background/language.js (allLanguages keys + fa).
const SUPPORTED_LOCALES = [
    "ar", "de", "en", "en-US", "es", "fa", "fr", "he", "hi", "id", "it",
    "ja", "ko", "ms", "nl", "pl", "pt-PT", "pt-BR", "ru", "th", "tr", "uk", "vi", "zh-CN", "zh-TW"
];

const MESSAGES = {
    en: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend Shopping Assistant",
        host_headline_off: "Almost done!",
        host_subhead_off: "Complete these steps to start using JOJOFriend:",
        host_step1_prefix: "Go to ",
        host_step1_link: "Extension Settings",
        host_step1_suffix: ". Check the box next to JOJOFriend to enable it.",
        host_step2: "Select [b]Always Allow on Every Website[/b] so we can find coupons everywhere you shop.",
        host_mock_allow: "Always Allow on Every Website...",
        host_btn_open: "Go to Extension Settings",
        host_headline_on: "You're all set!",
        host_subhead_on: "JOJOFriend is active in Safari. Start shopping and we'll help you save.",
        host_status_enabled: "Extension enabled",
        host_feature_1: "Auto-find coupons at checkout",
        host_feature_2: "Apply the best code in one click",
        host_feature_3: "Works across supported stores",
        host_btn_manage: "Manage in Safari Settings"
    },
    en_US: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend Shopping Assistant",
        host_headline_off: "Almost done!",
        host_subhead_off: "Complete these steps to start using JOJOFriend:",
        host_step1_prefix: "Go to ",
        host_step1_link: "Extension Settings",
        host_step1_suffix: ". Check the box next to JOJOFriend to enable it.",
        host_step2: "Select [b]Always Allow on Every Website[/b] so we can find coupons everywhere you shop.",
        host_mock_allow: "Always Allow on Every Website...",
        host_btn_open: "Go to Extension Settings",
        host_headline_on: "You're all set!",
        host_subhead_on: "JOJOFriend is active in Safari. Start shopping and we'll help you save.",
        host_status_enabled: "Extension enabled",
        host_feature_1: "Auto-find coupons at checkout",
        host_feature_2: "Apply the best code in one click",
        host_feature_3: "Works across supported stores",
        host_btn_manage: "Manage in Safari Settings"
    },
    zh_CN: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend 购物助手",
        host_headline_off: "快完成了！",
        host_subhead_off: "完成以下步骤即可开始使用 JOJOFriend：",
        host_step1_prefix: "前往",
        host_step1_link: "扩展设置",
        host_step1_suffix: "，勾选 JOJOFriend 旁的复选框以启用。",
        host_step2: "选择[b]始终允许在所有网站上[/b]，以便我们在你购物时查找优惠券。",
        host_mock_allow: "始终允许在所有网站上...",
        host_btn_open: "前往扩展设置",
        host_headline_on: "一切就绪！",
        host_subhead_on: "JOJOFriend 已在 Safari 中启用。开始购物，我们会帮你省钱。",
        host_status_enabled: "扩展已启用",
        host_feature_1: "结账时自动查找优惠券",
        host_feature_2: "一键应用最佳优惠码",
        host_feature_3: "支持众多合作商店",
        host_btn_manage: "在 Safari 设置中管理"
    },
    zh_TW: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend 購物助手",
        host_headline_off: "快完成了！",
        host_subhead_off: "完成以下步驟即可開始使用 JOJOFriend：",
        host_step1_prefix: "前往",
        host_step1_link: "延伸功能設定",
        host_step1_suffix: "，勾選 JOJOFriend 旁的核取方塊以啟用。",
        host_step2: "選擇[b]一律允許在所有網站上[/b]，以便我們在你購物時查找優惠券。",
        host_mock_allow: "一律允許在所有網站上...",
        host_btn_open: "前往延伸功能設定",
        host_headline_on: "一切就緒！",
        host_subhead_on: "JOJOFriend 已在 Safari 中啟用。開始購物，我們會幫你省錢。",
        host_status_enabled: "延伸功能已啟用",
        host_feature_1: "結帳時自動查找優惠券",
        host_feature_2: "一鍵套用最佳優惠碼",
        host_feature_3: "支援眾多合作商店",
        host_btn_manage: "在 Safari 設定中管理"
    },
    de: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend Einkaufsassistent",
        host_headline_off: "Fast geschafft!",
        host_subhead_off: "Führen Sie diese Schritte aus, um JOJOFriend zu nutzen:",
        host_step1_prefix: "Gehen Sie zu ",
        host_step1_link: "Erweiterungseinstellungen",
        host_step1_suffix: ". Aktivieren Sie JOJOFriend durch Ankreuzen des Kontrollkästchens.",
        host_step2: "Wählen Sie [b]Auf jeder Website immer erlauben[/b], damit wir überall Gutscheine finden können.",
        host_mock_allow: "Auf jeder Website immer erlauben...",
        host_btn_open: "Zu den Erweiterungseinstellungen",
        host_headline_on: "Alles bereit!",
        host_subhead_on: "JOJOFriend ist in Safari aktiv. Shoppen Sie los – wir helfen Ihnen beim Sparen.",
        host_status_enabled: "Erweiterung aktiviert",
        host_feature_1: "Gutscheine automatisch an der Kasse finden",
        host_feature_2: "Besten Code mit einem Klick anwenden",
        host_feature_3: "Funktioniert in unterstützten Shops",
        host_btn_manage: "In Safari-Einstellungen verwalten"
    },
    es: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Asistente de compras JOJOFriend",
        host_headline_off: "¡Casi listo!",
        host_subhead_off: "Completa estos pasos para empezar a usar JOJOFriend:",
        host_step1_prefix: "Ve a ",
        host_step1_link: "Ajustes de extensiones",
        host_step1_suffix: ". Marca la casilla junto a JOJOFriend para activarlo.",
        host_step2: "Selecciona [b]Permitir siempre en todos los sitios web[/b] para que podamos encontrar cupones donde compres.",
        host_mock_allow: "Permitir siempre en todos los sitios web...",
        host_btn_open: "Ir a Ajustes de extensiones",
        host_headline_on: "¡Todo listo!",
        host_subhead_on: "JOJOFriend está activo en Safari. Empieza a comprar y te ayudaremos a ahorrar.",
        host_status_enabled: "Extensión activada",
        host_feature_1: "Encuentra cupones automáticamente al pagar",
        host_feature_2: "Aplica el mejor código con un clic",
        host_feature_3: "Funciona en tiendas compatibles",
        host_btn_manage: "Administrar en Ajustes de Safari"
    },
    fr: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Assistant shopping JOJOFriend",
        host_headline_off: "Presque terminé !",
        host_subhead_off: "Suivez ces étapes pour commencer à utiliser JOJOFriend :",
        host_step1_prefix: "Allez dans ",
        host_step1_link: "Réglages des extensions",
        host_step1_suffix: ". Cochez la case à côté de JOJOFriend pour l'activer.",
        host_step2: "Sélectionnez [b]Toujours autoriser sur tous les sites[/b] afin que nous puissions trouver des coupons partout où vous achetez.",
        host_mock_allow: "Toujours autoriser sur tous les sites...",
        host_btn_open: "Aller aux Réglages des extensions",
        host_headline_on: "C'est prêt !",
        host_subhead_on: "JOJOFriend est actif dans Safari. Faites vos achats, nous vous aiderons à économiser.",
        host_status_enabled: "Extension activée",
        host_feature_1: "Trouve automatiquement des coupons à la caisse",
        host_feature_2: "Applique le meilleur code en un clic",
        host_feature_3: "Fonctionne sur les boutiques prises en charge",
        host_btn_manage: "Gérer dans les Réglages Safari"
    },
    it: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Assistente acquisti JOJOFriend",
        host_headline_off: "Quasi fatto!",
        host_subhead_off: "Completa questi passaggi per iniziare a usare JOJOFriend:",
        host_step1_prefix: "Vai a ",
        host_step1_link: "Impostazioni estensioni",
        host_step1_suffix: ". Seleziona la casella accanto a JOJOFriend per abilitarla.",
        host_step2: "Seleziona [b]Consenti sempre su tutti i siti web[/b] così possiamo trovare coupon ovunque tu faccia acquisti.",
        host_mock_allow: "Consenti sempre su tutti i siti web...",
        host_btn_open: "Vai a Impostazioni estensioni",
        host_headline_on: "Tutto pronto!",
        host_subhead_on: "JOJOFriend è attivo in Safari. Inizia a fare acquisti e ti aiuteremo a risparmiare.",
        host_status_enabled: "Estensione abilitata",
        host_feature_1: "Trova automaticamente coupon al checkout",
        host_feature_2: "Applica il miglior codice con un clic",
        host_feature_3: "Funziona nei negozi supportati",
        host_btn_manage: "Gestisci nelle Impostazioni di Safari"
    },
    ja: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend ショッピングアシスタント",
        host_headline_off: "もう少しで完了です！",
        host_subhead_off: "次の手順を完了して JOJOFriend を使い始めましょう：",
        host_step1_prefix: "",
        host_step1_link: "拡張機能設定",
        host_step1_suffix: "を開き、JOJOFriend の横のチェックボックスをオンにしてください。",
        host_step2: "[b]すべてのウェブサイトで常に許可[/b] を選択すると、お買い物中どこでもクーポンを見つけられます。",
        host_mock_allow: "すべてのウェブサイトで常に許可...",
        host_btn_open: "拡張機能設定を開く",
        host_headline_on: "設定完了！",
        host_subhead_on: "JOJOFriend が Safari で有効になりました。お買い物を始めると、お得にサポートします。",
        host_status_enabled: "拡張機能が有効",
        host_feature_1: "チェックアウト時にクーポンを自動検出",
        host_feature_2: "ワンクリックで最適なコードを適用",
        host_feature_3: "対応ストアで動作",
        host_btn_manage: "Safari 設定で管理"
    },
    ko: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend 쇼핑 어시스턴트",
        host_headline_off: "거의 완료되었습니다!",
        host_subhead_off: "JOJOFriend 사용을 시작하려면 다음 단계를 완료하세요:",
        host_step1_prefix: "",
        host_step1_link: "확장 프로그램 설정",
        host_step1_suffix: "으로 이동하여 JOJOFriend 옆의 확인란을 선택하세요.",
        host_step2: "[b]모든 웹사이트에서 항상 허용[/b]을 선택하면 쇼핑하는 모든 곳에서 쿠폰을 찾을 수 있습니다.",
        host_mock_allow: "모든 웹사이트에서 항상 허용...",
        host_btn_open: "확장 프로그램 설정으로 이동",
        host_headline_on: "모든 준비가 완료되었습니다!",
        host_subhead_on: "JOJOFriend가 Safari에서 활성화되었습니다. 쇼핑을 시작하면 절약을 도와드립니다.",
        host_status_enabled: "확장 프로그램 사용됨",
        host_feature_1: "결제 시 쿠폰 자동 찾기",
        host_feature_2: "한 번의 클릭으로 최적의 코드 적용",
        host_feature_3: "지원되는 스토어에서 작동",
        host_btn_manage: "Safari 설정에서 관리"
    },
    pt_BR: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Assistente de compras JOJOFriend",
        host_headline_off: "Quase pronto!",
        host_subhead_off: "Conclua estas etapas para começar a usar o JOJOFriend:",
        host_step1_prefix: "Acesse ",
        host_step1_link: "Ajustes de Extensões",
        host_step1_suffix: ". Marque a caixa ao lado do JOJOFriend para ativá-lo.",
        host_step2: "Selecione [b]Sempre Permitir em Todos os Sites[/b] para encontrarmos cupons onde você comprar.",
        host_mock_allow: "Sempre Permitir em Todos os Sites...",
        host_btn_open: "Ir para Ajustes de Extensões",
        host_headline_on: "Tudo pronto!",
        host_subhead_on: "O JOJOFriend está ativo no Safari. Comece a comprar e nós ajudaremos você a economizar.",
        host_status_enabled: "Extensão ativada",
        host_feature_1: "Encontra cupons automaticamente no checkout",
        host_feature_2: "Aplica o melhor código com um clique",
        host_feature_3: "Funciona em lojas compatíveis",
        host_btn_manage: "Gerenciar nos Ajustes do Safari"
    },
    pt_PT: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Assistente de compras JOJOFriend",
        host_headline_off: "Quase pronto!",
        host_subhead_off: "Conclua estes passos para começar a utilizar o JOJOFriend:",
        host_step1_prefix: "Aceda a ",
        host_step1_link: "Definições de Extensões",
        host_step1_suffix: ". Marque a caixa junto ao JOJOFriend para o ativar.",
        host_step2: "Selecione [b]Permitir Sempre em Todos os Websites[/b] para encontrarmos cupões onde comprar.",
        host_mock_allow: "Permitir Sempre em Todos os Websites...",
        host_btn_open: "Ir para Definições de Extensões",
        host_headline_on: "Está tudo pronto!",
        host_subhead_on: "O JOJOFriend está ativo no Safari. Comece a comprar e ajudaremos a poupar.",
        host_status_enabled: "Extensão ativada",
        host_feature_1: "Encontra cupões automaticamente no checkout",
        host_feature_2: "Aplica o melhor código com um clique",
        host_feature_3: "Funciona em lojas suportadas",
        host_btn_manage: "Gerir nas Definições do Safari"
    },
    ru: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Помощник по покупкам JOJOFriend",
        host_headline_off: "Почти готово!",
        host_subhead_off: "Выполните эти шаги, чтобы начать использовать JOJOFriend:",
        host_step1_prefix: "Перейдите в ",
        host_step1_link: "Настройки расширений",
        host_step1_suffix: ". Установите флажок рядом с JOJOFriend, чтобы включить его.",
        host_step2: "Выберите [b]Всегда разрешать на всех сайтах[/b], чтобы мы могли находить купоны везде, где вы делаете покупки.",
        host_mock_allow: "Всегда разрешать на всех сайтах...",
        host_btn_open: "Перейти в Настройки расширений",
        host_headline_on: "Всё готово!",
        host_subhead_on: "JOJOFriend активен в Safari. Начните покупки — мы поможем сэкономить.",
        host_status_enabled: "Расширение включено",
        host_feature_1: "Автоматический поиск купонов при оплате",
        host_feature_2: "Применение лучшего кода одним щелчком",
        host_feature_3: "Работает в поддерживаемых магазинах",
        host_btn_manage: "Управление в настройках Safari"
    },
    nl: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend Shopping Assistent",
        host_headline_off: "Bijna klaar!",
        host_subhead_off: "Voltooi deze stappen om JOJOFriend te gaan gebruiken:",
        host_step1_prefix: "Ga naar ",
        host_step1_link: "Extensie-instellingen",
        host_step1_suffix: ". Vink het vakje naast JOJOFriend aan om het in te schakelen.",
        host_step2: "Selecteer [b]Altijd toestaan op elke website[/b] zodat we overal coupons kunnen vinden waar je winkelt.",
        host_mock_allow: "Altijd toestaan op elke website...",
        host_btn_open: "Ga naar Extensie-instellingen",
        host_headline_on: "Alles is klaar!",
        host_subhead_on: "JOJOFriend is actief in Safari. Begin met winkelen en wij helpen je besparen.",
        host_status_enabled: "Extensie ingeschakeld",
        host_feature_1: "Coupons automatisch vinden bij afrekenen",
        host_feature_2: "Beste code toepassen met één klik",
        host_feature_3: "Werkt in ondersteunde winkels",
        host_btn_manage: "Beheren in Safari-instellingen"
    },
    pl: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Asystent zakupów JOJOFriend",
        host_headline_off: "Prawie gotowe!",
        host_subhead_off: "Wykonaj te kroki, aby zacząć korzystać z JOJOFriend:",
        host_step1_prefix: "Przejdź do ",
        host_step1_link: "Ustawień rozszerzeń",
        host_step1_suffix: ". Zaznacz pole obok JOJOFriend, aby je włączyć.",
        host_step2: "Wybierz [b]Zawsze zezwalaj na wszystkich witrynach[/b], abyśmy mogli znajdować kupony wszędzie, gdzie robisz zakupy.",
        host_mock_allow: "Zawsze zezwalaj na wszystkich witrynach...",
        host_btn_open: "Przejdź do Ustawień rozszerzeń",
        host_headline_on: "Wszystko gotowe!",
        host_subhead_on: "JOJOFriend jest aktywny w Safari. Rób zakupy, a pomożemy Ci zaoszczędzić.",
        host_status_enabled: "Rozszerzenie włączone",
        host_feature_1: "Automatyczne znajdowanie kuponów przy kasie",
        host_feature_2: "Zastosuj najlepszy kod jednym kliknięciem",
        host_feature_3: "Działa w obsługiwanych sklepach",
        host_btn_manage: "Zarządzaj w ustawieniach Safari"
    },
    tr: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend Alışveriş Asistanı",
        host_headline_off: "Neredeyse bitti!",
        host_subhead_off: "JOJOFriend'i kullanmaya başlamak için şu adımları tamamlayın:",
        host_step1_prefix: "",
        host_step1_link: "Uzantı Ayarları",
        host_step1_suffix: "'na gidin. Etkinleştirmek için JOJOFriend'in yanındaki kutuyu işaretleyin.",
        host_step2: "Alışveriş yaptığınız her yerde kupon bulabilmemiz için [b]Her Web Sitesinde Her Zaman İzin Ver[/b] seçeneğini belirleyin.",
        host_mock_allow: "Her Web Sitesinde Her Zaman İzin Ver...",
        host_btn_open: "Uzantı Ayarları'na Git",
        host_headline_on: "Her şey hazır!",
        host_subhead_on: "JOJOFriend Safari'de etkin. Alışverişe başlayın, tasarruf etmenize yardımcı olalım.",
        host_status_enabled: "Uzantı etkin",
        host_feature_1: "Ödeme sırasında kuponları otomatik bul",
        host_feature_2: "En iyi kodu tek tıkla uygula",
        host_feature_3: "Desteklenen mağazalarda çalışır",
        host_btn_manage: "Safari Ayarları'nda Yönet"
    },
    uk: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Помічник з покупок JOJOFriend",
        host_headline_off: "Майже готово!",
        host_subhead_off: "Виконайте ці кроки, щоб почати користуватися JOJOFriend:",
        host_step1_prefix: "Перейдіть до ",
        host_step1_link: "Налаштувань розширень",
        host_step1_suffix: ". Поставте прапорець біля JOJOFriend, щоб увімкнути його.",
        host_step2: "Виберіть [b]Завжди дозволяти на всіх сайтах[/b], щоб ми могли знаходити купони всюди, де ви робите покупки.",
        host_mock_allow: "Завжди дозволяти на всіх сайтах...",
        host_btn_open: "Перейти до Налаштувань розширень",
        host_headline_on: "Усе готово!",
        host_subhead_on: "JOJOFriend активний у Safari. Починайте покупки — ми допоможемо заощадити.",
        host_status_enabled: "Розширення увімкнено",
        host_feature_1: "Автоматичний пошук купонів при оплаті",
        host_feature_2: "Застосування найкращого коду одним кліком",
        host_feature_3: "Працює в підтримуваних магазинах",
        host_btn_manage: "Керувати в налаштуваннях Safari"
    },
    vi: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Trợ lý mua sắm JOJOFriend",
        host_headline_off: "Sắp xong rồi!",
        host_subhead_off: "Hoàn thành các bước sau để bắt đầu sử dụng JOJOFriend:",
        host_step1_prefix: "Vào ",
        host_step1_link: "Cài đặt Tiện ích",
        host_step1_suffix: ". Đánh dấu vào ô bên cạnh JOJOFriend để bật.",
        host_step2: "Chọn [b]Luôn Cho phép trên Mọi Trang web[/b] để chúng tôi có thể tìm phiếu giảm giá ở mọi nơi bạn mua sắm.",
        host_mock_allow: "Luôn Cho phép trên Mọi Trang web...",
        host_btn_open: "Đi tới Cài đặt Tiện ích",
        host_headline_on: "Đã sẵn sàng!",
        host_subhead_on: "JOJOFriend đang hoạt động trong Safari. Bắt đầu mua sắm và chúng tôi sẽ giúp bạn tiết kiệm.",
        host_status_enabled: "Tiện ích đã bật",
        host_feature_1: "Tự động tìm phiếu giảm giá khi thanh toán",
        host_feature_2: "Áp dụng mã tốt nhất chỉ với một cú nhấp",
        host_feature_3: "Hoạt động trên các cửa hàng được hỗ trợ",
        host_btn_manage: "Quản lý trong Cài đặt Safari"
    },
    th: {
        host_app_title: "JOJOFriend",
        host_extension_name: "ผู้ช่วยช้อปปิ้ง JOJOFriend",
        host_headline_off: "ใกล้เสร็จแล้ว!",
        host_subhead_off: "ทำตามขั้นตอนเหล่านี้เพื่อเริ่มใช้ JOJOFriend:",
        host_step1_prefix: "ไปที่ ",
        host_step1_link: "การตั้งค่าส่วนขยาย",
        host_step1_suffix: " แล้วเลือกช่องทำเครื่องหมายข้าง JOJOFriend เพื่อเปิดใช้งาน",
        host_step2: "เลือก [b]อนุญาตเสมอในทุกเว็บไซต์[/b] เพื่อให้เราค้นหาคูปองได้ทุกที่ที่คุณช้อปปิ้ง",
        host_mock_allow: "อนุญาตเสมอในทุกเว็บไซต์...",
        host_btn_open: "ไปที่การตั้งค่าส่วนขยาย",
        host_headline_on: "พร้อมแล้ว!",
        host_subhead_on: "JOJOFriend เปิดใช้งานใน Safari แล้ว เริ่มช้อปปิ้งได้เลย เราจะช่วยคุณประหยัด",
        host_status_enabled: "เปิดใช้งานส่วนขยายแล้ว",
        host_feature_1: "ค้นหาคูปองอัตโนมัติเมื่อชำระเงิน",
        host_feature_2: "ใช้โค้ดที่ดีที่สุดได้ในคลิกเดียว",
        host_feature_3: "ใช้งานได้กับร้านค้าที่รองรับ",
        host_btn_manage: "จัดการในการตั้งค่า Safari"
    },
    id: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Asisten Belanja JOJOFriend",
        host_headline_off: "Hampir selesai!",
        host_subhead_off: "Selesaikan langkah-langkah ini untuk mulai menggunakan JOJOFriend:",
        host_step1_prefix: "Buka ",
        host_step1_link: "Pengaturan Ekstensi",
        host_step1_suffix: ". Centang kotak di samping JOJOFriend untuk mengaktifkannya.",
        host_step2: "Pilih [b]Selalu Izinkan di Setiap Situs Web[/b] agar kami dapat menemukan kupon di mana pun Anda berbelanja.",
        host_mock_allow: "Selalu Izinkan di Setiap Situs Web...",
        host_btn_open: "Buka Pengaturan Ekstensi",
        host_headline_on: "Semua siap!",
        host_subhead_on: "JOJOFriend aktif di Safari. Mulai berbelanja dan kami akan membantu Anda hemat.",
        host_status_enabled: "Ekstensi diaktifkan",
        host_feature_1: "Temukan kupon otomatis saat checkout",
        host_feature_2: "Terapkan kode terbaik dengan satu klik",
        host_feature_3: "Berfungsi di toko yang didukung",
        host_btn_manage: "Kelola di Pengaturan Safari"
    },
    ms: {
        host_app_title: "JOJOFriend",
        host_extension_name: "Pembantu Beli-belah JOJOFriend",
        host_headline_off: "Hampir siap!",
        host_subhead_off: "Lengkapkan langkah-langkah ini untuk mula menggunakan JOJOFriend:",
        host_step1_prefix: "Pergi ke ",
        host_step1_link: "Tetapan Sambungan",
        host_step1_suffix: ". Tandakan kotak di sebelah JOJOFriend untuk mengaktifkannya.",
        host_step2: "Pilih [b]Sentiasa Benarkan pada Setiap Laman Web[/b] supaya kami boleh mencari kupon di mana sahaja anda membeli-belah.",
        host_mock_allow: "Sentiasa Benarkan pada Setiap Laman Web...",
        host_btn_open: "Pergi ke Tetapan Sambungan",
        host_headline_on: "Semuanya sudah sedia!",
        host_subhead_on: "JOJOFriend aktif dalam Safari. Mula membeli-belah dan kami akan membantu anda jimat.",
        host_status_enabled: "Sambungan diaktifkan",
        host_feature_1: "Cari kupon secara automatik semasa checkout",
        host_feature_2: "Gunakan kod terbaik dengan satu klik",
        host_feature_3: "Berfungsi di kedai yang disokong",
        host_btn_manage: "Urus dalam Tetapan Safari"
    },
    hi: {
        host_app_title: "JOJOFriend",
        host_extension_name: "JOJOFriend शॉपिंग असिस्टेंट",
        host_headline_off: "लगभग हो गया!",
        host_subhead_off: "JOJOFriend का उपयोग शुरू करने के लिए ये चरण पूरे करें:",
        host_step1_prefix: "",
        host_step1_link: "एक्सटेंशन सेटिंग्स",
        host_step1_suffix: " पर जाएँ। इसे सक्षम करने के लिए JOJOFriend के बगल वाला बॉक्स चुनें।",
        host_step2: "[b]हर वेबसाइट पर हमेशा अनुमति दें[/b] चुनें ताकि हम आपकी हर खरीदारी पर कूपन ढूँढ सकें।",
        host_mock_allow: "हर वेबसाइट पर हमेशा अनुमति दें...",
        host_btn_open: "एक्सटेंशन सेटिंग्स पर जाएँ",
        host_headline_on: "सब तैयार है!",
        host_subhead_on: "JOJOFriend Safari में सक्रिय है। खरीदारी शुरू करें, हम बचत में मदद करेंगे।",
        host_status_enabled: "एक्सटेंशन सक्षम",
        host_feature_1: "चेकआउट पर स्वचालित रूप से कूपन खोजें",
        host_feature_2: "एक क्लिक में सर्वोत्तम कोड लागू करें",
        host_feature_3: "समर्थित स्टोर पर काम करता है",
        host_btn_manage: "Safari सेटिंग्स में प्रबंधित करें"
    },
    ar: {
        host_app_title: "JOJOFriend",
        host_extension_name: "مساعد التسوق JOJOFriend",
        host_headline_off: "أوشكت على الانتهاء!",
        host_subhead_off: "أكمل هذه الخطوات لبدء استخدام JOJOFriend:",
        host_step1_prefix: "انتقل إلى ",
        host_step1_link: "إعدادات الامتداد",
        host_step1_suffix: ". حدّد المربع بجانب JOJOFriend لتفعيله.",
        host_step2: "اختر [b]السماح دائمًا على كل موقع[/b] حتى نتمكن من العثور على القسائم أينما تتسوق.",
        host_mock_allow: "السماح دائمًا على كل موقع...",
        host_btn_open: "انتقل إلى إعدادات الامتداد",
        host_headline_on: "كل شيء جاهز!",
        host_subhead_on: "JOJOFriend نشط في Safari. ابدأ التسوق وسنساعدك على التوفير.",
        host_status_enabled: "تم تفعيل الامتداد",
        host_feature_1: "العثور تلقائيًا على القسائم عند الدفع",
        host_feature_2: "تطبيق أفضل رمز بنقرة واحدة",
        host_feature_3: "يعمل في المتاجر المدعومة",
        host_btn_manage: "الإدارة في إعدادات Safari"
    },
    he: {
        host_app_title: "JOJOFriend",
        host_extension_name: "עוזר הקניות JOJOFriend",
        host_headline_off: "כמעט סיימנו!",
        host_subhead_off: "השלם/י את השלבים האלה כדי להתחיל להשתמש ב-JOJOFriend:",
        host_step1_prefix: "עבור/י ל",
        host_step1_link: "הגדרות תוספים",
        host_step1_suffix: ". סמן/י את התיבה ליד JOJOFriend כדי להפעיל.",
        host_step2: "בחר/י [b]לאפשר תמיד בכל אתר[/b] כדי שנוכל למצוא קופונים בכל מקום שבו את/ה קונה.",
        host_mock_allow: "לאפשר תמיד בכל אתר...",
        host_btn_open: "עבור/י להגדרות תוספים",
        host_headline_on: "הכול מוכן!",
        host_subhead_on: "JOJOFriend פעיל ב-Safari. התחל/י לקנות ונעזור לך לחסוך.",
        host_status_enabled: "התוסף מופעל",
        host_feature_1: "מציאת קופונים אוטומטית בקופה",
        host_feature_2: "החלת הקוד הטוב ביותר בלחיצה אחת",
        host_feature_3: "עובד בחנויות נתמכות",
        host_btn_manage: "נהל/י בהגדרות Safari"
    },
    fa: {
        host_app_title: "JOJOFriend",
        host_extension_name: "دستیار خرید JOJOFriend",
        host_headline_off: "تقریباً تمام شد!",
        host_subhead_off: "برای شروع استفاده از JOJOFriend این مراحل را تکمیل کنید:",
        host_step1_prefix: "به ",
        host_step1_link: "تنظیمات افزونه",
        host_step1_suffix: " بروید. کادر کنار JOJOFriend را علامت بزنید تا فعال شود.",
        host_step2: "[b]همیشه در همه وب‌سایت‌ها مجاز[/b] را انتخاب کنید تا بتوانیم در همه جا کوپن پیدا کنیم.",
        host_mock_allow: "همیشه در همه وب‌سایت‌ها مجاز...",
        host_btn_open: "رفتن به تنظیمات افزونه",
        host_headline_on: "همه‌چیز آماده است!",
        host_subhead_on: "JOJOFriend در Safari فعال است. خرید را شروع کنید تا در صرفه‌جویی کمک کنیم.",
        host_status_enabled: "افزونه فعال شد",
        host_feature_1: "یافتن خودکار کوپن هنگام پرداخت",
        host_feature_2: "اعمال بهترین کد با یک کلیک",
        host_feature_3: "در فروشگاه‌های پشتیبانی‌شده کار می‌کند",
        host_btn_manage: "مدیریت در تنظیمات Safari"
    }
};

let currentLocale = DEFAULT_LOCALE;
let langVars = MESSAGES[DEFAULT_LOCALE];

function normalizeLocale(raw) {
    if (!raw) {
        return null;
    }

    const parts = String(raw)
        .trim()
        .replace(/_/g, "-")
        .split("-")
        .filter(Boolean);

    const lang = parts[0].toLowerCase();
    const region = parts.slice(1).find((part) => /^[a-z]{2}$/i.test(part));

    return region ? `${lang}-${region.toUpperCase()}` : lang;
}

function toMessageKey(locale) {
    return String(locale || "").replace(/-/g, "_");
}

function buildLocaleIndex() {
    const index = {};

    SUPPORTED_LOCALES.forEach((locale) => {
        const normalized = normalizeLocale(locale);
        if (!normalized) {
            return;
        }

        index[normalized.toLowerCase()] = locale;

        const short = normalized.split("-")[0];
        if (!index[short]) {
            index[short] = locale;
        }
    });

    return index;
}

const localeIndex = buildLocaleIndex();

function getLocaleCandidates() {
    const candidates = [];
    const seen = new Set();

    function pushCandidate(entry) {
        if (!entry || seen.has(entry)) {
            return;
        }

        seen.add(entry);
        candidates.push(entry);
    }

    function append(raw) {
        const normalized = normalizeLocale(raw);
        if (!normalized) {
            return;
        }

        const canonical = localeIndex[normalized.toLowerCase()];
        pushCandidate(canonical || normalized);
        if (canonical && canonical !== normalized) {
            pushCandidate(normalized);
        }

        const [lang, region] = normalized.split("-");

        if (lang === "zh") {
            if (region === "HK" || region === "MO") {
                pushCandidate("zh-TW");
            }
            if (region === "SG") {
                pushCandidate("zh-CN");
            }
            if (partsInclude(raw, "hans")) {
                pushCandidate("zh-CN");
            }
            if (partsInclude(raw, "hant")) {
                pushCandidate("zh-TW");
            }
        }

        if (lang === "pt" && !region) {
            pushCandidate("pt-PT");
            pushCandidate("pt-BR");
        }

        // Fall back to the primary locale for a language group (e.g. fr-CA -> fr).
        if (localeIndex[lang]) {
            pushCandidate(localeIndex[lang]);
        }
    }

    function partsInclude(raw, value) {
        return String(raw).toLowerCase().split(/[-_]/).includes(value);
    }

    const preferredLanguages = Array.isArray(window.__PREFERRED_LANGUAGES__)
        ? window.__PREFERRED_LANGUAGES__
        : [];

    preferredLanguages.forEach(append);
    (navigator.languages || []).forEach(append);
    append(navigator.language);
    append(DEFAULT_LOCALE);

    return [...new Set(candidates.map((candidate) => toMessageKey(candidate)))];
}

function resolveLocale() {
    for (const candidate of getLocaleCandidates()) {
        if (MESSAGES[candidate]) {
            return candidate;
        }
    }

    return DEFAULT_LOCALE;
}

function getMessage(key) {
    return langVars[key] || "";
}

function formatMessage(key, asHtml = false) {
    let message = getMessage(key);

    if (asHtml) {
        message = message.replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>");
        message = message.replace(/\[em\](.*?)\[\/em\]/g, "<em>$1</em>");
    }

    return message;
}

function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const asHtml = element.hasAttribute("data-i18n-html");
        const message = formatMessage(key, asHtml);

        if (!message) {
            return;
        }

        if (asHtml) {
            element.innerHTML = message;
        } else {
            element.textContent = message;
        }
    });

    document.title = getMessage("host_app_title") || "JOJOFriend";

    document.querySelectorAll(".brand-logo").forEach((logo) => {
        logo.setAttribute("alt", getMessage("host_app_title") || "JOJOFriend");
    });

    document.documentElement.lang = currentLocale.split("_")[0];
    document.documentElement.dir = RTL_LOCALES.some((locale) => currentLocale.startsWith(locale)) ? "rtl" : "ltr";
}

function initI18n() {
    currentLocale = resolveLocale();
    langVars = MESSAGES[currentLocale] || MESSAGES[DEFAULT_LOCALE];
    applyI18n();
}

function show(enabled, useSettingsInsteadOfPreferences) {
    if (useSettingsInsteadOfPreferences) {
        // Reserved for future macOS settings wording updates.
    }

    if (typeof enabled === "boolean") {
        document.body.classList.toggle("state-on", enabled);
        document.body.classList.toggle("state-off", !enabled);
    }
}

function openPreferences() {
    webkit.messageHandlers.controller.postMessage("open-preferences");
}

function boot() {
    const enabled = typeof window.__INITIAL_ENABLED__ === "boolean"
        ? window.__INITIAL_ENABLED__
        : false;
    const useSettings = window.__USE_SETTINGS__ === true || window.__USE_SETTINGS__ === "true";

    show(enabled, useSettings);
    initI18n();
}

document.querySelectorAll(".open-preferences").forEach((element) => {
    element.addEventListener("click", openPreferences);
});

boot();
window.show = show;
window.getCurrentLocale = () => currentLocale;

