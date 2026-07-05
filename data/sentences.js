const SENTENCES = [
  {
    "no": 1,
    "en": "In Taiwan, students are able to accept a small accident and still achieve their dream of studying abroad.",
    "zh": "在臺灣，學生能夠接受小意外，仍然達成出國讀書的夢想。",
    "words": [
      "able",
      "abroad",
      "accept",
      "accident",
      "achieve"
    ]
  },
  {
    "no": 2,
    "en": "An active student wrote his address clearly, used his advantage, followed good advice, and could afford the trip.",
    "zh": "一位積極的學生清楚寫下地址，運用自己的優勢，聽從好建議，也負擔得起這趟旅行。",
    "words": [
      "active",
      "address",
      "advantage",
      "advice",
      "afford"
    ]
  },
  {
    "no": 3,
    "en": "Although many people were against the plan, the class agreed to allow a small amount of time for discussion.",
    "zh": "雖然很多人反對這個計畫，班上仍同意允許一小段時間討論。",
    "words": [
      "against",
      "agree",
      "allow",
      "although",
      "amount"
    ]
  },
  {
    "no": 4,
    "en": "In an ancient street near a Taipei apartment, tourists appeared, argued about the map, and finally arranged a tour.",
    "zh": "在臺北公寓附近的一條古老街道，遊客出現、爭論地圖，最後安排了一趟導覽。",
    "words": [
      "ancient",
      "apartment",
      "appear",
      "argue",
      "arrange"
    ]
  },
  {
    "no": 5,
    "en": "The article caught my attention, so I stayed awake, avoided noise, and learned about the writer’s background.",
    "zh": "這篇文章吸引我的注意，所以我保持清醒、避免吵雜，並了解作者背景。",
    "words": [
      "article",
      "attention",
      "avoid",
      "awake",
      "background"
    ]
  },
  {
    "no": 6,
    "en": "Good behavior helps students keep balance, believe in themselves, know where they belong, and learn more besides textbooks.",
    "zh": "好行為幫助學生保持平衡、相信自己、知道歸屬，也學到課本以外的東西。",
    "words": [
      "balance",
      "behavior",
      "believe",
      "belong",
      "besides"
    ]
  },
  {
    "no": 7,
    "en": "The tea was bitter, but I did not bother my friend; I just borrowed water from him and took a deep breath at the bottom of the hill.",
    "zh": "茶很苦，但我沒有打擾朋友；我只是向他借水，並在山腳下深呼吸。",
    "words": [
      "bitter",
      "borrow",
      "bother",
      "bottom",
      "breathe"
    ]
  },
  {
    "no": 8,
    "en": "During a typhoon, many business meetings were canceled, so workers stayed calm, thought about their careers, and were careful on the road.",
    "zh": "颱風時，許多商務會議被取消，所以工作者保持冷靜、思考職涯，並在路上小心。",
    "words": [
      "business",
      "calm",
      "cancel",
      "career",
      "careful"
    ]
  },
  {
    "no": 9,
    "en": "We celebrated in central Taiwan because we had a chance to change the main character in our school play.",
    "zh": "我們在中臺灣慶祝，因為我們有機會改變校園戲劇中的主角。",
    "words": [
      "celebrate",
      "central",
      "chance",
      "change",
      "character"
    ]
  },
  {
    "no": 10,
    "en": "The night market did not charge much, so the cheerful students made a good choice, collected stamps, and felt comfortable.",
    "zh": "夜市收費不高，所以開朗的學生做了好選擇、收集印章，並感到舒服。",
    "words": [
      "charge",
      "cheerful",
      "choice",
      "collect",
      "comfortable"
    ]
  },
  {
    "no": 11,
    "en": "We compared two MRT routes, considered the traffic condition, completed the plan, and continued our trip.",
    "zh": "我們比較兩條捷運路線，考慮交通狀況，完成計畫，並繼續旅行。",
    "words": [
      "compare",
      "complete",
      "condition",
      "consider",
      "continue"
    ]
  },
  {
    "no": 12,
    "en": "It is convenient to copy notes after a class conversation, but students should control their time and correct mistakes.",
    "zh": "課堂對話後抄筆記很方便，但學生應控制時間並改正錯誤。",
    "words": [
      "control",
      "convenient",
      "conversation",
      "copy",
      "correct"
    ]
  },
  {
    "no": 13,
    "en": "A curious customer asked about Taiwan’s tea culture, but the shopkeeper said the broken cup caused damage and was dangerous.",
    "zh": "一位好奇的顧客詢問臺灣茶文化，但店員說破杯造成損害而且很危險。",
    "words": [
      "culture",
      "curious",
      "customer",
      "damage",
      "dangerous"
    ]
  },
  {
    "no": 14,
    "en": "We decided to describe the heat by degree, deliver water to classmates, and depend on teamwork.",
    "zh": "我們決定用度數描述炎熱、送水給同學，並依靠團隊合作。",
    "words": [
      "decide",
      "degree",
      "deliver",
      "depend",
      "describe"
    ]
  },
  {
    "no": 15,
    "en": "The school asked us to design a poster, develop ideas, explain the difference, solve a difficult problem, and follow the direction.",
    "zh": "學校要求我們設計海報、發展想法、說明差異、解決難題，並遵照指示。",
    "words": [
      "design",
      "develop",
      "difference",
      "difficult",
      "direction"
    ]
  },
  {
    "no": 16,
    "en": "Doctors discovered a disease, so they kept their distance, divided the work, and doubled their care.",
    "zh": "醫生發現一種疾病，所以他們保持距離、分配工作，並加倍照護。",
    "words": [
      "discover",
      "disease",
      "distance",
      "divide",
      "double"
    ]
  },
  {
    "no": 17,
    "en": "I had no doubt that education has a strong effect when students make an effort to help the elderly.",
    "zh": "我毫不懷疑，當學生努力幫助長者時，教育會有很大的影響。",
    "words": [
      "doubt",
      "education",
      "effect",
      "effort",
      "elderly"
    ]
  },
  {
    "no": 18,
    "en": "An engineer said saving electricity can protect the environment, save energy, and encourage families to live better.",
    "zh": "一位工程師說，節省電力可以保護環境、節省能源，並鼓勵家庭過得更好。",
    "words": [
      "electricity",
      "encourage",
      "energy",
      "engineer",
      "environment"
    ]
  },
  {
    "no": 19,
    "en": "This school event was especially excellent because students shared their experience and explained local history.",
    "zh": "這場校園活動特別優秀，因為學生分享經驗並解釋地方歷史。",
    "words": [
      "especially",
      "event",
      "excellent",
      "experience",
      "explain"
    ]
  },
  {
    "no": 20,
    "en": "In fact, if students fail, they should express their feelings, find something familiar, and learn from famous people.",
    "zh": "事實上，如果學生失敗，他們應表達感受、找熟悉的事物，並向名人學習。",
    "words": [
      "express",
      "fact",
      "fail",
      "familiar",
      "famous"
    ]
  },
  {
    "no": 21,
    "en": "Taiwan’s fashion students may fear failure, but after a fever, they returned to the design field and finally finished the show.",
    "zh": "臺灣的時尚學生可能害怕失敗，但發燒後，他們回到設計領域，最後完成表演。",
    "words": [
      "fashion",
      "fear",
      "fever",
      "field",
      "finally"
    ]
  },
  {
    "no": 22,
    "en": "A foreign teacher used a simple form to ask about fresh fruit, the app’s function, and students’ future plans.",
    "zh": "一位外籍老師用簡單表格詢問新鮮水果、App 功能和學生未來計畫。",
    "words": [
      "foreign",
      "form",
      "fresh",
      "function",
      "future"
    ]
  },
  {
    "no": 23,
    "en": "The government asked every graduate to build a good habit, reduce garbage, and learn general rules.",
    "zh": "政府要求每位畢業生養成好習慣、減少垃圾，並學習一般規則。",
    "words": [
      "garbage",
      "general",
      "government",
      "graduate",
      "habit"
    ]
  },
  {
    "no": 24,
    "en": "When a heavy rainstorm happened, a healthy heart and helpful friends made us feel warm.",
    "zh": "當大雨發生時，健康的心和樂於助人的朋友讓我們感到溫暖。",
    "words": [
      "happen",
      "healthy",
      "heart",
      "heavy",
      "helpful"
    ]
  },
  {
    "no": 25,
    "en": "An honest student wanted to improve human life; however, his plan had to include real problems.",
    "zh": "一位誠實的學生想改善人類生活；然而，他的計畫必須包含真實問題。",
    "words": [
      "honest",
      "however",
      "human",
      "improve",
      "include"
    ]
  },
  {
    "no": 26,
    "en": "Taiwan’s industry may increase quickly, but independent thinking and correct information have great influence.",
    "zh": "臺灣產業可能快速增加，但獨立思考和正確資訊有很大影響。",
    "words": [
      "increase",
      "independent",
      "industry",
      "influence",
      "information"
    ]
  },
  {
    "no": 27,
    "en": "Instead of staying home, we followed our interest, introduced Taiwan’s island culture, and invited friends to join.",
    "zh": "我們沒有待在家，而是依照興趣，介紹臺灣島嶼文化，並邀請朋友加入。",
    "words": [
      "instead",
      "interest",
      "introduce",
      "invite",
      "island"
    ]
  },
  {
    "no": 28,
    "en": "During the journey, the leader used his knowledge of language to explain each level of the game.",
    "zh": "旅途中，領隊運用語言知識解釋遊戲的每個等級。",
    "words": [
      "journey",
      "knowledge",
      "language",
      "leader",
      "level"
    ]
  },
  {
    "no": 29,
    "en": "A local student felt lonely, but a machine show with magic tricks became a major memory.",
    "zh": "一位當地學生感到寂寞，但一場有神奇戲法的機器展成了重要回憶。",
    "words": [
      "local",
      "lonely",
      "machine",
      "magic",
      "major"
    ]
  },
  {
    "no": 30,
    "en": "To manage study time, Ann put a mark on each matter, used a new method, and improved her memory.",
    "zh": "為了管理讀書時間，Ann 在每件事上做記號，使用新方法，並改善記憶。",
    "words": [
      "manage",
      "mark",
      "matter",
      "memory",
      "method"
    ]
  },
  {
    "no": 31,
    "en": "In a modern classroom, students do not mind making a mistake for a moment because learning is natural.",
    "zh": "在現代教室中，學生不介意短暫犯錯，因為學習是自然的。",
    "words": [
      "mind",
      "mistake",
      "modern",
      "moment",
      "natural"
    ]
  },
  {
    "no": 32,
    "en": "It is necessary to tell your neighbor when you feel nervous, notice a strange object, or need help.",
    "zh": "當你感到緊張、注意到奇怪物品或需要幫助時，有必要告訴鄰居。",
    "words": [
      "necessary",
      "neighbor",
      "nervous",
      "notice",
      "object"
    ]
  },
  {
    "no": 33,
    "en": "An official gave an ordinary student an opportunity to offer his opinion about school lunch.",
    "zh": "一位官員給一位普通學生機會，讓他提供對學校午餐的意見。",
    "words": [
      "offer",
      "official",
      "opinion",
      "opportunity",
      "ordinary"
    ]
  },
  {
    "no": 34,
    "en": "During a special period, teachers organized a particular class to help each patient with personal needs.",
    "zh": "在一段特別期間，老師組織特定課程，幫助每位病人的個人需求。",
    "words": [
      "organize",
      "particular",
      "patient",
      "period",
      "personal"
    ]
  },
  {
    "no": 35,
    "en": "A polite student said it was possible to prepare a report about Taiwan’s population and how not to pollute rivers.",
    "zh": "一位有禮貌的學生說，可以準備一份關於臺灣人口和如何不污染河川的報告。",
    "words": [
      "polite",
      "pollute",
      "population",
      "possible",
      "prepare"
    ]
  },
  {
    "no": 36,
    "en": "Under pressure, the factory tried to prevent waste, keep data private, produce safe goods, and protect workers.",
    "zh": "在壓力下，工廠努力防止浪費、保護資料隱私、生產安全商品，並保護員工。",
    "words": [
      "pressure",
      "prevent",
      "private",
      "produce",
      "protect"
    ]
  },
  {
    "no": 37,
    "en": "The public finally realized the purpose of the plan: receive less trash and reduce waste.",
    "zh": "大眾終於了解這個計畫的目的：收到更少垃圾並減少浪費。",
    "words": [
      "public",
      "purpose",
      "realize",
      "receive",
      "reduce"
    ]
  },
  {
    "no": 38,
    "en": "If students refuse to keep a regular study plan, their relation with learning may weaken, so teachers repeat and help them remember.",
    "zh": "如果學生拒絕維持規律讀書計畫，他們與學習的關係可能變弱，所以老師會重複並幫助他們記住。",
    "words": [
      "refuse",
      "regular",
      "relation",
      "remember",
      "repeat"
    ]
  },
  {
    "no": 39,
    "en": "The class report had to represent Taiwan, require teamwork, show respect, and make each member responsible.",
    "zh": "這份班級報告必須代表臺灣、需要團隊合作、展現尊重，並讓每位成員負責。",
    "words": [
      "report",
      "represent",
      "require",
      "respect",
      "responsible"
    ]
  },
  {
    "no": 40,
    "en": "The exam result was serious, but the teacher asked us to return safely, check safety, and satisfy our parents with effort.",
    "zh": "考試結果很嚴肅，但老師要我們安全回家、注意安全，並用努力讓父母滿意。",
    "words": [
      "result",
      "return",
      "safety",
      "satisfy",
      "serious"
    ]
  },
  {
    "no": 41,
    "en": "Several students shared the situation, practiced a new skill, and learned how to help society.",
    "zh": "幾位學生分享情況、練習新技能，並學習如何幫助社會。",
    "words": [
      "several",
      "share",
      "situation",
      "skill",
      "society"
    ]
  },
  {
    "no": 42,
    "en": "To solve the problem, we checked the source, made a special poster, spread the news, and followed the standard.",
    "zh": "為了解決問題，我們檢查來源、製作特別海報、傳播消息，並遵守標準。",
    "words": [
      "solve",
      "source",
      "special",
      "spread",
      "standard"
    ]
  },
  {
    "no": 43,
    "en": "A strange idea became successful after teachers suggested changes, parents gave support, and students got a surprise.",
    "zh": "一個奇怪的想法在老師建議修改、家長支持、學生獲得驚喜後變得成功。",
    "words": [
      "strange",
      "successful",
      "suggest",
      "support",
      "surprise"
    ]
  },
  {
    "no": 44,
    "en": "During a terrible heat wave, a school system used technology to check the temperature and help students survive.",
    "zh": "在可怕的熱浪中，學校系統使用科技檢查溫度，幫助學生撐過去。",
    "words": [
      "survive",
      "system",
      "technology",
      "temperature",
      "terrible"
    ]
  },
  {
    "no": 45,
    "en": "I felt thirsty after walking through busy traffic, so the sports training became a little trouble for me.",
    "zh": "我走過繁忙交通後感到口渴，所以運動訓練對我來說有點麻煩。",
    "words": [
      "thirsty",
      "through",
      "traffic",
      "training",
      "trouble"
    ]
  },
  {
    "no": 46,
    "en": "People in the village usually trust the truth, follow their usual customs, and see old photos as valuable.",
    "zh": "村莊裡的人通常相信真相、遵循平常習俗，並把老照片視為有價值。",
    "words": [
      "trust",
      "truth",
      "usual",
      "valuable",
      "village"
    ]
  },
  {
    "no": 47,
    "en": "We should not waste food, watch the weather, decide whether to visit the whole market, and choose a wide road.",
    "zh": "我們不應浪費食物，要看天氣、決定是否參觀整個市場，並選擇寬一點的路。",
    "words": [
      "waste",
      "weather",
      "whether",
      "whole",
      "wide"
    ]
  },
  {
    "no": 48,
    "en": "I wonder why many youth still worry about grades, but every effort is worth more than zero.",
    "zh": "我想知道為什麼許多年輕人仍擔心成績，但每一份努力都比零更值得。",
    "words": [
      "wonder",
      "worry",
      "worth",
      "youth",
      "zero"
    ]
  },
  {
    "no": 49,
    "en": "When we reached the repair shop, the clerk remained calm, reminded us to wait, repaired the bike, and replaced the tire.",
    "zh": "當我們到達修車店，店員保持冷靜，提醒我們等待，修理腳踏車並更換輪胎。",
    "words": [
      "reach",
      "remain",
      "remind",
      "repair",
      "replace"
    ]
  },
  {
    "no": 50,
    "en": "As prices rose, the school kept students safe, changed the lunch schedule, added a science lesson, and used a bigger screen.",
    "zh": "當價格上升時，學校維持學生安全、改變午餐時間表、增加科學課，並使用更大的螢幕。",
    "words": [
      "rise",
      "safe",
      "schedule",
      "science",
      "screen"
    ]
  },
  {
    "no": 51,
    "en": "We searched the secret section of the library, selected a book, and finally understood its sense.",
    "zh": "我們搜尋圖書館的秘密區域，選了一本書，最後了解它的意義。",
    "words": [
      "search",
      "secret",
      "section",
      "select",
      "sense"
    ]
  },
  {
    "no": 52,
    "en": "The shop offered service in a simple way, used a round shape, kept lines separate, and sold similar cups.",
    "zh": "這家店用簡單方式提供服務，使用圓形造型，讓排隊動線分開，並販售相似杯子。",
    "words": [
      "separate",
      "service",
      "shape",
      "simple",
      "similar"
    ]
  },
  {
    "no": 53,
    "en": "A single student with strong spirit used social media, watched his speed, and spent time helping others.",
    "zh": "一位有強烈精神的學生使用社群媒體、注意速度，並花時間幫助別人。",
    "words": [
      "single",
      "social",
      "speed",
      "spend",
      "spirit"
    ]
  },
  {
    "no": 54,
    "en": "At the city square, a guide stated the next step, pointed to the MRT station, and told us where to store our bags.",
    "zh": "在城市廣場，導遊說明下一步，指向捷運站，並告訴我們哪裡可以寄放包包。",
    "words": [
      "square",
      "state",
      "station",
      "step",
      "store"
    ]
  },
  {
    "no": 55,
    "en": "The teacher walked straight to the stranger, reduced his stress, explained the subject, and helped him succeed.",
    "zh": "老師直接走向陌生人，降低他的壓力，解釋主題，並幫助他成功。",
    "words": [
      "straight",
      "stranger",
      "stress",
      "subject",
      "succeed"
    ]
  },
  {
    "no": 56,
    "en": "During a temple festival, volunteers supplied tea, supposed everyone would taste it, and told kids not to tear posters.",
    "zh": "在廟會中，志工供應茶，認為大家會品嚐，並告訴小孩不要撕海報。",
    "words": [
      "supply",
      "suppose",
      "taste",
      "tear",
      "temple"
    ]
  },
  {
    "no": 57,
    "en": "The theater was tidy, but a tiny mistake changed the topic and increased the total cost.",
    "zh": "劇院很整齊，但一個小錯誤改變了主題，也增加了總成本。",
    "words": [
      "theater",
      "tidy",
      "tiny",
      "topic",
      "total"
    ]
  },
  {
    "no": 58,
    "en": "Taiwan’s tradition includes good transportation, kind ways to treat guests, short family trips, and many types of snacks.",
    "zh": "臺灣的傳統包含良好的交通、友善待客方式、短程家庭旅行，以及多種類型小吃。",
    "words": [
      "tradition",
      "transportation",
      "treat",
      "trip",
      "type"
    ]
  },
  {
    "no": 59,
    "en": "Students who understand teamwork wear the same uniform, unite as a class, use useful ideas, and enjoy their vacation.",
    "zh": "了解團隊合作的學生穿著同樣制服、團結成一班、使用有用的想法，並享受假期。",
    "words": [
      "understand",
      "uniform",
      "unite",
      "useful",
      "vacation"
    ]
  },
  {
    "no": 60,
    "en": "A wise volunteer asked people to vote, warned them about heavy bags, and checked the weight.",
    "zh": "一位明智的志工請大家投票，提醒他們注意重包包，並檢查重量。",
    "words": [
      "volunteer",
      "vote",
      "warn",
      "weight",
      "wise"
    ]
  }
];
