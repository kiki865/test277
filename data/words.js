const WORDS = [
  {
    "no": 1,
    "en": "able",
    "form": "adj.",
    "zh": "能夠的"
  },
  {
    "no": 2,
    "en": "abroad",
    "form": "adv.",
    "zh": "到國外；在國外"
  },
  {
    "no": 3,
    "en": "accept",
    "form": "accept-accepted-accepted",
    "zh": "接受"
  },
  {
    "no": 4,
    "en": "accident",
    "form": "n.",
    "zh": "意外事故"
  },
  {
    "no": 5,
    "en": "achieve",
    "form": "achieve-achieved-achieved",
    "zh": "達成"
  },
  {
    "no": 6,
    "en": "active",
    "form": "adj.",
    "zh": "活躍的；積極的"
  },
  {
    "no": 7,
    "en": "address",
    "form": "n./v.",
    "zh": "地址；演說；處理"
  },
  {
    "no": 8,
    "en": "advantage",
    "form": "n.",
    "zh": "優點；優勢"
  },
  {
    "no": 9,
    "en": "advice",
    "form": "n.",
    "zh": "建議"
  },
  {
    "no": 10,
    "en": "afford",
    "form": "afford-afforded-afforded",
    "zh": "負擔得起"
  },
  {
    "no": 11,
    "en": "against",
    "form": "prep.",
    "zh": "反對；靠著"
  },
  {
    "no": 12,
    "en": "agree",
    "form": "agree-agreed-agreed",
    "zh": "同意"
  },
  {
    "no": 13,
    "en": "allow",
    "form": "allow-allowed-allowed",
    "zh": "允許"
  },
  {
    "no": 14,
    "en": "although",
    "form": "conj.",
    "zh": "雖然"
  },
  {
    "no": 15,
    "en": "amount",
    "form": "n.",
    "zh": "數量；總額"
  },
  {
    "no": 16,
    "en": "ancient",
    "form": "adj.",
    "zh": "古老的"
  },
  {
    "no": 17,
    "en": "apartment",
    "form": "n.",
    "zh": "公寓"
  },
  {
    "no": 18,
    "en": "appear",
    "form": "appear-appeared-appeared",
    "zh": "出現；看起來"
  },
  {
    "no": 19,
    "en": "argue",
    "form": "argue-argued-argued",
    "zh": "爭論"
  },
  {
    "no": 20,
    "en": "arrange",
    "form": "arrange-arranged-arranged",
    "zh": "安排"
  },
  {
    "no": 21,
    "en": "article",
    "form": "n.",
    "zh": "文章；物品"
  },
  {
    "no": 22,
    "en": "attention",
    "form": "n.",
    "zh": "注意力"
  },
  {
    "no": 23,
    "en": "avoid",
    "form": "avoid-avoided-avoided",
    "zh": "避免"
  },
  {
    "no": 24,
    "en": "awake",
    "form": "awake-awoke-awoken",
    "zh": "醒著；醒來"
  },
  {
    "no": 25,
    "en": "background",
    "form": "n.",
    "zh": "背景"
  },
  {
    "no": 26,
    "en": "balance",
    "form": "n./v.",
    "zh": "平衡"
  },
  {
    "no": 27,
    "en": "behavior",
    "form": "n.",
    "zh": "行為"
  },
  {
    "no": 28,
    "en": "believe",
    "form": "believe-believed-believed",
    "zh": "相信"
  },
  {
    "no": 29,
    "en": "belong",
    "form": "belong-belonged-belonged",
    "zh": "屬於"
  },
  {
    "no": 30,
    "en": "besides",
    "form": "prep./adv.",
    "zh": "除了；此外"
  },
  {
    "no": 31,
    "en": "bitter",
    "form": "adj.",
    "zh": "苦的；痛苦的"
  },
  {
    "no": 32,
    "en": "borrow",
    "form": "borrow-borrowed-borrowed",
    "zh": "借入"
  },
  {
    "no": 33,
    "en": "bother",
    "form": "bother-bothered-bothered",
    "zh": "打擾；麻煩"
  },
  {
    "no": 34,
    "en": "bottom",
    "form": "n.",
    "zh": "底部"
  },
  {
    "no": 35,
    "en": "breathe",
    "form": "breathe-breathed-breathed",
    "zh": "呼吸"
  },
  {
    "no": 36,
    "en": "business",
    "form": "n.",
    "zh": "生意；事業"
  },
  {
    "no": 37,
    "en": "calm",
    "form": "adj./v.",
    "zh": "冷靜的；使冷靜"
  },
  {
    "no": 38,
    "en": "cancel",
    "form": "cancel-canceled-canceled",
    "zh": "取消"
  },
  {
    "no": 39,
    "en": "career",
    "form": "n.",
    "zh": "職業；生涯"
  },
  {
    "no": 40,
    "en": "careful",
    "form": "adj.",
    "zh": "小心的"
  },
  {
    "no": 41,
    "en": "celebrate",
    "form": "celebrate-celebrated-celebrated",
    "zh": "慶祝"
  },
  {
    "no": 42,
    "en": "central",
    "form": "adj.",
    "zh": "中央的；主要的"
  },
  {
    "no": 43,
    "en": "chance",
    "form": "n.",
    "zh": "機會"
  },
  {
    "no": 44,
    "en": "change",
    "form": "change-changed-changed",
    "zh": "改變"
  },
  {
    "no": 45,
    "en": "character",
    "form": "n.",
    "zh": "個性；角色；文字"
  },
  {
    "no": 46,
    "en": "charge",
    "form": "n./v.",
    "zh": "費用；收費；充電"
  },
  {
    "no": 47,
    "en": "cheerful",
    "form": "adj.",
    "zh": "開朗的"
  },
  {
    "no": 48,
    "en": "choice",
    "form": "n.",
    "zh": "選擇"
  },
  {
    "no": 49,
    "en": "collect",
    "form": "collect-collected-collected",
    "zh": "收集；領取"
  },
  {
    "no": 50,
    "en": "comfortable",
    "form": "adj.",
    "zh": "舒服的"
  },
  {
    "no": 51,
    "en": "compare",
    "form": "compare-compared-compared",
    "zh": "比較"
  },
  {
    "no": 52,
    "en": "complete",
    "form": "complete-completed-completed",
    "zh": "完成；完整的"
  },
  {
    "no": 53,
    "en": "condition",
    "form": "n.",
    "zh": "狀況；條件"
  },
  {
    "no": 54,
    "en": "consider",
    "form": "consider-considered-considered",
    "zh": "考慮"
  },
  {
    "no": 55,
    "en": "continue",
    "form": "continue-continued-continued",
    "zh": "繼續"
  },
  {
    "no": 56,
    "en": "control",
    "form": "n./v.",
    "zh": "控制"
  },
  {
    "no": 57,
    "en": "convenient",
    "form": "adj.",
    "zh": "方便的"
  },
  {
    "no": 58,
    "en": "conversation",
    "form": "n.",
    "zh": "對話"
  },
  {
    "no": 59,
    "en": "copy",
    "form": "n./v.",
    "zh": "複本；抄寫"
  },
  {
    "no": 60,
    "en": "correct",
    "form": "adj./v.",
    "zh": "正確的；改正"
  },
  {
    "no": 61,
    "en": "culture",
    "form": "n.",
    "zh": "文化"
  },
  {
    "no": 62,
    "en": "curious",
    "form": "adj.",
    "zh": "好奇的"
  },
  {
    "no": 63,
    "en": "customer",
    "form": "n.",
    "zh": "顧客"
  },
  {
    "no": 64,
    "en": "damage",
    "form": "n./v.",
    "zh": "損害"
  },
  {
    "no": 65,
    "en": "dangerous",
    "form": "adj.",
    "zh": "危險的"
  },
  {
    "no": 66,
    "en": "decide",
    "form": "decide-decided-decided",
    "zh": "決定"
  },
  {
    "no": 67,
    "en": "degree",
    "form": "n.",
    "zh": "程度；度數；學位"
  },
  {
    "no": 68,
    "en": "deliver",
    "form": "deliver-delivered-delivered",
    "zh": "遞送；發表"
  },
  {
    "no": 69,
    "en": "depend",
    "form": "depend-depended-depended",
    "zh": "依靠；取決於"
  },
  {
    "no": 70,
    "en": "describe",
    "form": "describe-described-described",
    "zh": "描述"
  },
  {
    "no": 71,
    "en": "design",
    "form": "n./v.",
    "zh": "設計"
  },
  {
    "no": 72,
    "en": "develop",
    "form": "develop-developed-developed",
    "zh": "發展；培養"
  },
  {
    "no": 73,
    "en": "difference",
    "form": "n.",
    "zh": "差異"
  },
  {
    "no": 74,
    "en": "difficult",
    "form": "adj.",
    "zh": "困難的"
  },
  {
    "no": 75,
    "en": "direction",
    "form": "n.",
    "zh": "方向；指示"
  },
  {
    "no": 76,
    "en": "discover",
    "form": "discover-discovered-discovered",
    "zh": "發現"
  },
  {
    "no": 77,
    "en": "disease",
    "form": "n.",
    "zh": "疾病"
  },
  {
    "no": 78,
    "en": "distance",
    "form": "n.",
    "zh": "距離"
  },
  {
    "no": 79,
    "en": "divide",
    "form": "divide-divided-divided",
    "zh": "分開；分配"
  },
  {
    "no": 80,
    "en": "double",
    "form": "adj./v.",
    "zh": "雙倍的；加倍"
  },
  {
    "no": 81,
    "en": "doubt",
    "form": "n./v.",
    "zh": "懷疑"
  },
  {
    "no": 82,
    "en": "education",
    "form": "n.",
    "zh": "教育"
  },
  {
    "no": 83,
    "en": "effect",
    "form": "n.",
    "zh": "影響；效果"
  },
  {
    "no": 84,
    "en": "effort",
    "form": "n.",
    "zh": "努力"
  },
  {
    "no": 85,
    "en": "elderly",
    "form": "adj./n.",
    "zh": "年長的；長者"
  },
  {
    "no": 86,
    "en": "electricity",
    "form": "n.",
    "zh": "電"
  },
  {
    "no": 87,
    "en": "encourage",
    "form": "encourage-encouraged-encouraged",
    "zh": "鼓勵"
  },
  {
    "no": 88,
    "en": "energy",
    "form": "n.",
    "zh": "能量；精力"
  },
  {
    "no": 89,
    "en": "engineer",
    "form": "n.",
    "zh": "工程師"
  },
  {
    "no": 90,
    "en": "environment",
    "form": "n.",
    "zh": "環境"
  },
  {
    "no": 91,
    "en": "especially",
    "form": "adv.",
    "zh": "特別是"
  },
  {
    "no": 92,
    "en": "event",
    "form": "n.",
    "zh": "活動；事件"
  },
  {
    "no": 93,
    "en": "excellent",
    "form": "adj.",
    "zh": "優秀的"
  },
  {
    "no": 94,
    "en": "experience",
    "form": "n./v.",
    "zh": "經驗；經歷"
  },
  {
    "no": 95,
    "en": "explain",
    "form": "explain-explained-explained",
    "zh": "解釋"
  },
  {
    "no": 96,
    "en": "express",
    "form": "express-expressed-expressed",
    "zh": "表達"
  },
  {
    "no": 97,
    "en": "fact",
    "form": "n.",
    "zh": "事實"
  },
  {
    "no": 98,
    "en": "fail",
    "form": "fail-failed-failed",
    "zh": "失敗；未能做到"
  },
  {
    "no": 99,
    "en": "familiar",
    "form": "adj.",
    "zh": "熟悉的"
  },
  {
    "no": 100,
    "en": "famous",
    "form": "adj.",
    "zh": "著名的"
  },
  {
    "no": 101,
    "en": "fashion",
    "form": "n.",
    "zh": "時尚"
  },
  {
    "no": 102,
    "en": "fear",
    "form": "n./v.",
    "zh": "害怕；恐懼"
  },
  {
    "no": 103,
    "en": "fever",
    "form": "n.",
    "zh": "發燒"
  },
  {
    "no": 104,
    "en": "field",
    "form": "n.",
    "zh": "田地；領域"
  },
  {
    "no": 105,
    "en": "finally",
    "form": "adv.",
    "zh": "最後；終於"
  },
  {
    "no": 106,
    "en": "foreign",
    "form": "adj.",
    "zh": "外國的"
  },
  {
    "no": 107,
    "en": "form",
    "form": "n./v.",
    "zh": "表格；形式；形成"
  },
  {
    "no": 108,
    "en": "fresh",
    "form": "adj.",
    "zh": "新鮮的"
  },
  {
    "no": 109,
    "en": "function",
    "form": "n./v.",
    "zh": "功能；運作"
  },
  {
    "no": 110,
    "en": "future",
    "form": "n./adj.",
    "zh": "未來；未來的"
  },
  {
    "no": 111,
    "en": "garbage",
    "form": "n.",
    "zh": "垃圾"
  },
  {
    "no": 112,
    "en": "general",
    "form": "adj./n.",
    "zh": "一般的；將軍"
  },
  {
    "no": 113,
    "en": "government",
    "form": "n.",
    "zh": "政府"
  },
  {
    "no": 114,
    "en": "graduate",
    "form": "n./v.",
    "zh": "畢業生；畢業"
  },
  {
    "no": 115,
    "en": "habit",
    "form": "n.",
    "zh": "習慣"
  },
  {
    "no": 116,
    "en": "happen",
    "form": "happen-happened-happened",
    "zh": "發生"
  },
  {
    "no": 117,
    "en": "healthy",
    "form": "adj.",
    "zh": "健康的"
  },
  {
    "no": 118,
    "en": "heart",
    "form": "n.",
    "zh": "心臟；內心"
  },
  {
    "no": 119,
    "en": "heavy",
    "form": "adj.",
    "zh": "重的；大的"
  },
  {
    "no": 120,
    "en": "helpful",
    "form": "adj.",
    "zh": "有幫助的"
  },
  {
    "no": 121,
    "en": "honest",
    "form": "adj.",
    "zh": "誠實的"
  },
  {
    "no": 122,
    "en": "however",
    "form": "adv./conj.",
    "zh": "然而"
  },
  {
    "no": 123,
    "en": "human",
    "form": "n./adj.",
    "zh": "人類；人的"
  },
  {
    "no": 124,
    "en": "improve",
    "form": "improve-improved-improved",
    "zh": "改善；進步"
  },
  {
    "no": 125,
    "en": "include",
    "form": "include-included-included",
    "zh": "包含"
  },
  {
    "no": 126,
    "en": "increase",
    "form": "n./v.",
    "zh": "增加"
  },
  {
    "no": 127,
    "en": "independent",
    "form": "adj.",
    "zh": "獨立的"
  },
  {
    "no": 128,
    "en": "industry",
    "form": "n.",
    "zh": "產業"
  },
  {
    "no": 129,
    "en": "influence",
    "form": "n./v.",
    "zh": "影響"
  },
  {
    "no": 130,
    "en": "information",
    "form": "n.",
    "zh": "資訊"
  },
  {
    "no": 131,
    "en": "instead",
    "form": "adv.",
    "zh": "反而；取而代之"
  },
  {
    "no": 132,
    "en": "interest",
    "form": "n./v.",
    "zh": "興趣；使感興趣"
  },
  {
    "no": 133,
    "en": "introduce",
    "form": "introduce-introduced-introduced",
    "zh": "介紹"
  },
  {
    "no": 134,
    "en": "invite",
    "form": "invite-invited-invited",
    "zh": "邀請"
  },
  {
    "no": 135,
    "en": "island",
    "form": "n.",
    "zh": "島嶼"
  },
  {
    "no": 136,
    "en": "journey",
    "form": "n.",
    "zh": "旅程"
  },
  {
    "no": 137,
    "en": "knowledge",
    "form": "n.",
    "zh": "知識"
  },
  {
    "no": 138,
    "en": "language",
    "form": "n.",
    "zh": "語言"
  },
  {
    "no": 139,
    "en": "leader",
    "form": "n.",
    "zh": "領導者"
  },
  {
    "no": 140,
    "en": "level",
    "form": "n.",
    "zh": "程度；等級"
  },
  {
    "no": 141,
    "en": "local",
    "form": "adj.",
    "zh": "當地的"
  },
  {
    "no": 142,
    "en": "lonely",
    "form": "adj.",
    "zh": "寂寞的"
  },
  {
    "no": 143,
    "en": "machine",
    "form": "n.",
    "zh": "機器"
  },
  {
    "no": 144,
    "en": "magic",
    "form": "n./adj.",
    "zh": "魔法；神奇的"
  },
  {
    "no": 145,
    "en": "major",
    "form": "adj./n.",
    "zh": "主要的；主修"
  },
  {
    "no": 146,
    "en": "manage",
    "form": "manage-managed-managed",
    "zh": "管理；設法完成"
  },
  {
    "no": 147,
    "en": "mark",
    "form": "n./v.",
    "zh": "記號；分數；標示"
  },
  {
    "no": 148,
    "en": "matter",
    "form": "n./v.",
    "zh": "事情；重要"
  },
  {
    "no": 149,
    "en": "memory",
    "form": "n.",
    "zh": "記憶"
  },
  {
    "no": 150,
    "en": "method",
    "form": "n.",
    "zh": "方法"
  },
  {
    "no": 151,
    "en": "mind",
    "form": "n./v.",
    "zh": "頭腦；介意"
  },
  {
    "no": 152,
    "en": "mistake",
    "form": "n.",
    "zh": "錯誤"
  },
  {
    "no": 153,
    "en": "modern",
    "form": "adj.",
    "zh": "現代的"
  },
  {
    "no": 154,
    "en": "moment",
    "form": "n.",
    "zh": "片刻"
  },
  {
    "no": 155,
    "en": "natural",
    "form": "adj.",
    "zh": "自然的"
  },
  {
    "no": 156,
    "en": "necessary",
    "form": "adj.",
    "zh": "必要的"
  },
  {
    "no": 157,
    "en": "neighbor",
    "form": "n.",
    "zh": "鄰居"
  },
  {
    "no": 158,
    "en": "nervous",
    "form": "adj.",
    "zh": "緊張的"
  },
  {
    "no": 159,
    "en": "notice",
    "form": "n./v.",
    "zh": "通知；注意到"
  },
  {
    "no": 160,
    "en": "object",
    "form": "n.",
    "zh": "物品；物體"
  },
  {
    "no": 161,
    "en": "offer",
    "form": "n./v.",
    "zh": "提供；提議"
  },
  {
    "no": 162,
    "en": "official",
    "form": "adj./n.",
    "zh": "官方的；官員"
  },
  {
    "no": 163,
    "en": "opinion",
    "form": "n.",
    "zh": "意見"
  },
  {
    "no": 164,
    "en": "opportunity",
    "form": "n.",
    "zh": "機會"
  },
  {
    "no": 165,
    "en": "ordinary",
    "form": "adj.",
    "zh": "普通的"
  },
  {
    "no": 166,
    "en": "organize",
    "form": "organize-organized-organized",
    "zh": "組織；整理"
  },
  {
    "no": 167,
    "en": "particular",
    "form": "adj.",
    "zh": "特定的；特別的"
  },
  {
    "no": 168,
    "en": "patient",
    "form": "adj./n.",
    "zh": "有耐心的；病人"
  },
  {
    "no": 169,
    "en": "period",
    "form": "n.",
    "zh": "期間；一節課"
  },
  {
    "no": 170,
    "en": "personal",
    "form": "adj.",
    "zh": "個人的"
  },
  {
    "no": 171,
    "en": "polite",
    "form": "adj.",
    "zh": "有禮貌的"
  },
  {
    "no": 172,
    "en": "pollute",
    "form": "pollute-polluted-polluted",
    "zh": "污染"
  },
  {
    "no": 173,
    "en": "population",
    "form": "n.",
    "zh": "人口"
  },
  {
    "no": 174,
    "en": "possible",
    "form": "adj.",
    "zh": "可能的"
  },
  {
    "no": 175,
    "en": "prepare",
    "form": "prepare-prepared-prepared",
    "zh": "準備"
  },
  {
    "no": 176,
    "en": "pressure",
    "form": "n.",
    "zh": "壓力"
  },
  {
    "no": 177,
    "en": "prevent",
    "form": "prevent-prevented-prevented",
    "zh": "防止"
  },
  {
    "no": 178,
    "en": "private",
    "form": "adj.",
    "zh": "私人的"
  },
  {
    "no": 179,
    "en": "produce",
    "form": "produce-produced-produced",
    "zh": "生產；製造"
  },
  {
    "no": 180,
    "en": "protect",
    "form": "protect-protected-protected",
    "zh": "保護"
  },
  {
    "no": 181,
    "en": "public",
    "form": "adj./n.",
    "zh": "公共的；大眾"
  },
  {
    "no": 182,
    "en": "purpose",
    "form": "n.",
    "zh": "目的"
  },
  {
    "no": 183,
    "en": "realize",
    "form": "realize-realized-realized",
    "zh": "了解；實現"
  },
  {
    "no": 184,
    "en": "receive",
    "form": "receive-received-received",
    "zh": "收到"
  },
  {
    "no": 185,
    "en": "reduce",
    "form": "reduce-reduced-reduced",
    "zh": "減少"
  },
  {
    "no": 186,
    "en": "refuse",
    "form": "refuse-refused-refused",
    "zh": "拒絕"
  },
  {
    "no": 187,
    "en": "regular",
    "form": "adj.",
    "zh": "規律的；固定的"
  },
  {
    "no": 188,
    "en": "relation",
    "form": "n.",
    "zh": "關係"
  },
  {
    "no": 189,
    "en": "remember",
    "form": "remember-remembered-remembered",
    "zh": "記得"
  },
  {
    "no": 190,
    "en": "repeat",
    "form": "repeat-repeated-repeated",
    "zh": "重複"
  },
  {
    "no": 191,
    "en": "report",
    "form": "n./v.",
    "zh": "報告；報導"
  },
  {
    "no": 192,
    "en": "represent",
    "form": "represent-represented-represented",
    "zh": "代表"
  },
  {
    "no": 193,
    "en": "require",
    "form": "require-required-required",
    "zh": "需要；要求"
  },
  {
    "no": 194,
    "en": "respect",
    "form": "n./v.",
    "zh": "尊重"
  },
  {
    "no": 195,
    "en": "responsible",
    "form": "adj.",
    "zh": "負責任的"
  },
  {
    "no": 196,
    "en": "result",
    "form": "n.",
    "zh": "結果"
  },
  {
    "no": 197,
    "en": "return",
    "form": "n./v.",
    "zh": "回來；歸還"
  },
  {
    "no": 198,
    "en": "safety",
    "form": "n.",
    "zh": "安全"
  },
  {
    "no": 199,
    "en": "satisfy",
    "form": "satisfy-satisfied-satisfied",
    "zh": "使滿意"
  },
  {
    "no": 200,
    "en": "serious",
    "form": "adj.",
    "zh": "嚴重的；認真的"
  },
  {
    "no": 201,
    "en": "several",
    "form": "adj.",
    "zh": "幾個的"
  },
  {
    "no": 202,
    "en": "share",
    "form": "share-shared-shared",
    "zh": "分享"
  },
  {
    "no": 203,
    "en": "situation",
    "form": "n.",
    "zh": "情況"
  },
  {
    "no": 204,
    "en": "skill",
    "form": "n.",
    "zh": "技能"
  },
  {
    "no": 205,
    "en": "society",
    "form": "n.",
    "zh": "社會"
  },
  {
    "no": 206,
    "en": "solve",
    "form": "solve-solved-solved",
    "zh": "解決"
  },
  {
    "no": 207,
    "en": "source",
    "form": "n.",
    "zh": "來源"
  },
  {
    "no": 208,
    "en": "special",
    "form": "adj.",
    "zh": "特別的"
  },
  {
    "no": 209,
    "en": "spread",
    "form": "spread-spread-spread",
    "zh": "傳播；展開"
  },
  {
    "no": 210,
    "en": "standard",
    "form": "n./adj.",
    "zh": "標準；標準的"
  },
  {
    "no": 211,
    "en": "strange",
    "form": "adj.",
    "zh": "奇怪的；陌生的"
  },
  {
    "no": 212,
    "en": "successful",
    "form": "adj.",
    "zh": "成功的"
  },
  {
    "no": 213,
    "en": "suggest",
    "form": "suggest-suggested-suggested",
    "zh": "建議"
  },
  {
    "no": 214,
    "en": "support",
    "form": "n./v.",
    "zh": "支持"
  },
  {
    "no": 215,
    "en": "surprise",
    "form": "n./v.",
    "zh": "驚喜；使驚訝"
  },
  {
    "no": 216,
    "en": "survive",
    "form": "survive-survived-survived",
    "zh": "生存；倖存"
  },
  {
    "no": 217,
    "en": "system",
    "form": "n.",
    "zh": "系統"
  },
  {
    "no": 218,
    "en": "technology",
    "form": "n.",
    "zh": "科技"
  },
  {
    "no": 219,
    "en": "temperature",
    "form": "n.",
    "zh": "溫度"
  },
  {
    "no": 220,
    "en": "terrible",
    "form": "adj.",
    "zh": "可怕的；糟糕的"
  },
  {
    "no": 221,
    "en": "thirsty",
    "form": "adj.",
    "zh": "口渴的"
  },
  {
    "no": 222,
    "en": "through",
    "form": "prep./adv.",
    "zh": "穿過；透過"
  },
  {
    "no": 223,
    "en": "traffic",
    "form": "n.",
    "zh": "交通"
  },
  {
    "no": 224,
    "en": "training",
    "form": "n.",
    "zh": "訓練"
  },
  {
    "no": 225,
    "en": "trouble",
    "form": "n.",
    "zh": "麻煩；困難"
  },
  {
    "no": 226,
    "en": "trust",
    "form": "n./v.",
    "zh": "信任"
  },
  {
    "no": 227,
    "en": "truth",
    "form": "n.",
    "zh": "真相"
  },
  {
    "no": 228,
    "en": "usual",
    "form": "adj.",
    "zh": "通常的"
  },
  {
    "no": 229,
    "en": "valuable",
    "form": "adj.",
    "zh": "有價值的"
  },
  {
    "no": 230,
    "en": "village",
    "form": "n.",
    "zh": "村莊"
  },
  {
    "no": 231,
    "en": "waste",
    "form": "n./v.",
    "zh": "浪費；廢棄物"
  },
  {
    "no": 232,
    "en": "weather",
    "form": "n.",
    "zh": "天氣"
  },
  {
    "no": 233,
    "en": "whether",
    "form": "conj.",
    "zh": "是否"
  },
  {
    "no": 234,
    "en": "whole",
    "form": "adj.",
    "zh": "整個的"
  },
  {
    "no": 235,
    "en": "wide",
    "form": "adj.",
    "zh": "寬的；廣泛的"
  },
  {
    "no": 236,
    "en": "wonder",
    "form": "n./v.",
    "zh": "想知道；奇蹟"
  },
  {
    "no": 237,
    "en": "worry",
    "form": "n./v.",
    "zh": "擔心"
  },
  {
    "no": 238,
    "en": "worth",
    "form": "adj.",
    "zh": "值得的"
  },
  {
    "no": 239,
    "en": "youth",
    "form": "n.",
    "zh": "青年；青春"
  },
  {
    "no": 240,
    "en": "zero",
    "form": "n./adj.",
    "zh": "零；沒有的"
  },
  {
    "no": 241,
    "en": "reach",
    "form": "reach-reached-reached",
    "zh": "到達；伸手拿"
  },
  {
    "no": 242,
    "en": "remain",
    "form": "remain-remained-remained",
    "zh": "保持；留下"
  },
  {
    "no": 243,
    "en": "remind",
    "form": "remind-reminded-reminded",
    "zh": "提醒"
  },
  {
    "no": 244,
    "en": "repair",
    "form": "repair-repaired-repaired",
    "zh": "修理"
  },
  {
    "no": 245,
    "en": "replace",
    "form": "replace-replaced-replaced",
    "zh": "取代；替換"
  },
  {
    "no": 246,
    "en": "rise",
    "form": "rise-rose-risen",
    "zh": "上升；升起"
  },
  {
    "no": 247,
    "en": "safe",
    "form": "adj.",
    "zh": "安全的"
  },
  {
    "no": 248,
    "en": "schedule",
    "form": "n./v.",
    "zh": "時間表；安排"
  },
  {
    "no": 249,
    "en": "science",
    "form": "n.",
    "zh": "科學"
  },
  {
    "no": 250,
    "en": "screen",
    "form": "n.",
    "zh": "螢幕"
  },
  {
    "no": 251,
    "en": "search",
    "form": "n./v.",
    "zh": "搜尋；尋找"
  },
  {
    "no": 252,
    "en": "secret",
    "form": "n./adj.",
    "zh": "秘密；秘密的"
  },
  {
    "no": 253,
    "en": "section",
    "form": "n.",
    "zh": "區域；部分"
  },
  {
    "no": 254,
    "en": "select",
    "form": "select-selected-selected",
    "zh": "選擇"
  },
  {
    "no": 255,
    "en": "sense",
    "form": "n.",
    "zh": "感覺；意義"
  },
  {
    "no": 256,
    "en": "separate",
    "form": "adj./v.",
    "zh": "分開的；分開"
  },
  {
    "no": 257,
    "en": "service",
    "form": "n.",
    "zh": "服務"
  },
  {
    "no": 258,
    "en": "shape",
    "form": "n./v.",
    "zh": "形狀；塑造"
  },
  {
    "no": 259,
    "en": "simple",
    "form": "adj.",
    "zh": "簡單的"
  },
  {
    "no": 260,
    "en": "similar",
    "form": "adj.",
    "zh": "相似的"
  },
  {
    "no": 261,
    "en": "single",
    "form": "adj.",
    "zh": "單一的；單身的"
  },
  {
    "no": 262,
    "en": "social",
    "form": "adj.",
    "zh": "社會的；社交的"
  },
  {
    "no": 263,
    "en": "speed",
    "form": "n./v.",
    "zh": "速度；加速"
  },
  {
    "no": 264,
    "en": "spend",
    "form": "spend-spent-spent",
    "zh": "花費"
  },
  {
    "no": 265,
    "en": "spirit",
    "form": "n.",
    "zh": "精神"
  },
  {
    "no": 266,
    "en": "square",
    "form": "n./adj.",
    "zh": "廣場；正方形的"
  },
  {
    "no": 267,
    "en": "state",
    "form": "n./v.",
    "zh": "狀態；陳述"
  },
  {
    "no": 268,
    "en": "station",
    "form": "n.",
    "zh": "車站；局"
  },
  {
    "no": 269,
    "en": "step",
    "form": "n./v.",
    "zh": "步驟；踩"
  },
  {
    "no": 270,
    "en": "store",
    "form": "n./v.",
    "zh": "商店；儲存"
  },
  {
    "no": 271,
    "en": "straight",
    "form": "adj./adv.",
    "zh": "直的；直接地"
  },
  {
    "no": 272,
    "en": "stranger",
    "form": "n.",
    "zh": "陌生人"
  },
  {
    "no": 273,
    "en": "stress",
    "form": "n./v.",
    "zh": "壓力；強調"
  },
  {
    "no": 274,
    "en": "subject",
    "form": "n.",
    "zh": "科目；主題"
  },
  {
    "no": 275,
    "en": "succeed",
    "form": "succeed-succeeded-succeeded",
    "zh": "成功"
  },
  {
    "no": 276,
    "en": "supply",
    "form": "n./v.",
    "zh": "供應"
  },
  {
    "no": 277,
    "en": "suppose",
    "form": "suppose-supposed-supposed",
    "zh": "假設；認為"
  },
  {
    "no": 278,
    "en": "taste",
    "form": "n./v.",
    "zh": "味道；品嚐"
  },
  {
    "no": 279,
    "en": "tear",
    "form": "tear-tore-torn",
    "zh": "撕裂"
  },
  {
    "no": 280,
    "en": "temple",
    "form": "n.",
    "zh": "廟宇"
  },
  {
    "no": 281,
    "en": "theater",
    "form": "n.",
    "zh": "劇院；電影院"
  },
  {
    "no": 282,
    "en": "tidy",
    "form": "adj./v.",
    "zh": "整齊的；整理"
  },
  {
    "no": 283,
    "en": "tiny",
    "form": "adj.",
    "zh": "微小的"
  },
  {
    "no": 284,
    "en": "topic",
    "form": "n.",
    "zh": "主題"
  },
  {
    "no": 285,
    "en": "total",
    "form": "adj./n.",
    "zh": "總共的；總數"
  },
  {
    "no": 286,
    "en": "tradition",
    "form": "n.",
    "zh": "傳統"
  },
  {
    "no": 287,
    "en": "transportation",
    "form": "n.",
    "zh": "交通運輸"
  },
  {
    "no": 288,
    "en": "treat",
    "form": "treat-treated-treated",
    "zh": "對待；治療；請客"
  },
  {
    "no": 289,
    "en": "trip",
    "form": "n.",
    "zh": "旅行"
  },
  {
    "no": 290,
    "en": "type",
    "form": "n./v.",
    "zh": "類型；打字"
  },
  {
    "no": 291,
    "en": "understand",
    "form": "understand-understood-understood",
    "zh": "了解"
  },
  {
    "no": 292,
    "en": "uniform",
    "form": "n.",
    "zh": "制服"
  },
  {
    "no": 293,
    "en": "unite",
    "form": "unite-united-united",
    "zh": "團結；聯合"
  },
  {
    "no": 294,
    "en": "useful",
    "form": "adj.",
    "zh": "有用的"
  },
  {
    "no": 295,
    "en": "vacation",
    "form": "n.",
    "zh": "假期"
  },
  {
    "no": 296,
    "en": "volunteer",
    "form": "n./v.",
    "zh": "志工；自願"
  },
  {
    "no": 297,
    "en": "vote",
    "form": "n./v.",
    "zh": "投票"
  },
  {
    "no": 298,
    "en": "warn",
    "form": "warn-warned-warned",
    "zh": "警告"
  },
  {
    "no": 299,
    "en": "weight",
    "form": "n.",
    "zh": "重量"
  },
  {
    "no": 300,
    "en": "wise",
    "form": "adj.",
    "zh": "明智的"
  }
];
