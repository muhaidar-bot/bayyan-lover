import { LoveMessage, WallpaperTheme } from '../types';

export const WALLPAPER_THEMES: WallpaperTheme[] = [
  {
    id: 'velvet-rose',
    name: 'Midnight Velvet Rose',
    previewColor: '#881337',
    gradientClass: 'from-[#1a050c] via-[#350819] to-[#0c0206]',
    ambientTone: 'rgba(244, 63, 94, 0.18)',
    petalColors: ['#ff99b3', '#f43f5e', '#fda4af', '#fecdd3', '#e11d48']
  },
  {
    id: 'sunset-blush',
    name: 'Enchanted Sunset',
    previewColor: '#be123c',
    gradientClass: 'from-[#2e091b] via-[#5c1130] to-[#1e0510]',
    ambientTone: 'rgba(251, 113, 133, 0.22)',
    petalColors: ['#ffb3c6', '#fb7185', '#ffe4e6', '#f43f5e', '#ff85a1']
  },
  {
    id: 'dreamy-starlight',
    name: 'Cosmic Starlight',
    previewColor: '#4c0519',
    gradientClass: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
    ambientTone: 'rgba(236, 72, 153, 0.18)',
    petalColors: ['#f472b6', '#fbcfe8', '#db2777', '#f9a8d4', '#fda4af']
  },
  {
    id: 'candlelit-passion',
    name: 'Candlelit Silk',
    previewColor: '#9f1239',
    gradientClass: 'from-[#2a0808] via-[#4d0c1e] to-[#180309]',
    ambientTone: 'rgba(251, 191, 36, 0.12)',
    petalColors: ['#fda4af', '#f43f5e', '#e11d48', '#ffe4e6', '#be123c']
  },
  {
    id: 'rose-quartz',
    name: 'Rose Quartz Blossom',
    previewColor: '#fb7185',
    gradientClass: 'from-[#3b1222] via-[#651c38] to-[#250814]',
    ambientTone: 'rgba(244, 63, 94, 0.25)',
    petalColors: ['#ffc0cb', '#ffb6c1', '#ff69b4', '#fecdd3', '#fda4af']
  }
];

export const BOX_METADATA = {
  love_messages: {
    id: 'love_messages',
    title: 'Sweet Love Messages',
    arabicTitle: 'رسائل حب وعشق',
    tagline: 'Tender promises & eternal devotion',
    icon: 'Heart',
    boxColor: 'from-rose-600 via-pink-600 to-rose-800',
    ribbonColor: 'bg-amber-300',
    glowColor: 'shadow-pink-500/50',
    description: 'Every secret whisper of my heart written only for you, my dearest Bayyan.'
  },
  deep_romance: {
    id: 'deep_romance',
    title: 'Deep Romance',
    arabicTitle: 'رومانسية عميقة وروحية',
    tagline: 'Soulmates, poetry & timeless vows',
    icon: 'Sparkles',
    boxColor: 'from-purple-800 via-rose-700 to-indigo-950',
    ribbonColor: 'bg-rose-200',
    glowColor: 'shadow-purple-500/50',
    description: 'When words become poetry and our souls melt into one sweet eternity.'
  },
  hot_feelings: {
    id: 'hot_feelings',
    title: 'Hot Feelings',
    arabicTitle: 'مشاعر دافئة وجريئة',
    tagline: 'Passion, electric chemistry & desire',
    icon: 'Flame',
    boxColor: 'from-red-600 via-rose-700 to-red-950',
    ribbonColor: 'bg-amber-400',
    glowColor: 'shadow-red-500/60',
    description: 'Intense warmth, racing heartbeats, and irresistible magnetic passion for Bayyan.'
  },
  romance_jokes: {
    id: 'romance_jokes',
    title: 'Romance Jokes',
    arabicTitle: 'نكت رومانسية ومداعبة',
    tagline: 'Sweet teasing, cute pick-ups & pure joy',
    icon: 'Smile',
    boxColor: 'from-pink-500 via-rose-500 to-fuchsia-700',
    ribbonColor: 'bg-yellow-200',
    glowColor: 'shadow-pink-400/50',
    description: 'Playful giggles, cheesy pick-up lines, and affectionate smiles to make Bayyan blush.'
  }
};

export const ROMANTIC_MESSAGES: LoveMessage[] = [
  // ================= BOX 1: SWEET LOVE MESSAGES =================
  {
    id: 'love-1',
    category: 'love_messages',
    title: 'You Are My Universe, Bayyan',
    body: 'Bayyan, from the moment you entered my world, everything ordinary turned into magic. You are not just my love—you are my sanctuary, my first thought every morning, and the sweetest dream I look forward to each night.',
    arabicSnippet: 'أنتِ لستِ فقط حبيبتي يا بيان.. أنتِ سر سعادتي ونبض قلبي.',
    moodTag: 'Pure Devotion',
    senderNote: 'Forever yours, unconditionally.',
    romanticDareOrAction: 'Close your eyes for 5 seconds and feel my arms gently wrapping around you.'
  },
  {
    id: 'love-2',
    category: 'love_messages',
    title: 'The Miracle Named Bayyan',
    body: 'If I were handed a billion lifetimes, Bayyan, I would seek you out in every single one of them. Loving you feels as natural and vital as breathing. You are the greatest blessing of my existence.',
    arabicSnippet: 'لو خُيِّرت بين العالم وبينك يا بيان، لاخترتك ألف مرة.',
    moodTag: 'Eternal Promise',
    senderNote: 'Written with all the tenderness in my soul.',
    romanticDareOrAction: 'Put your hand over your chest. Hear that beat? Mine beats in harmony with yours.'
  },
  {
    id: 'love-3',
    category: 'love_messages',
    title: 'In Your Eyes, Bayyan',
    body: 'Whenever I look into your eyes, Bayyan, I see the reflection of a future I never want to leave. There is a gentleness in your gaze that silences all chaos and makes me the happiest person alive.',
    arabicSnippet: 'في عينيكِ يا بيان، أجد وطني وكل ما تمنيته يوماً.',
    moodTag: 'Enchanted',
    senderNote: 'My heart belongs to you only.',
    romanticDareOrAction: 'Smile right now—that glowing smile of yours lights up my entire world.'
  },
  {
    id: 'love-4',
    category: 'love_messages',
    title: 'A Love That Grows Stronger',
    body: 'Every single day I discover a new reason to fall deeper in love with you, Bayyan. The way your voice brings calm, the warmth of your laughter, and the kindness in your heart make you irreplaceable.',
    arabicSnippet: 'كل يوم يمر، يزداد حبي لكِ ويتجدد يا زهرة أيامي.',
    moodTag: 'Growing Love',
    senderNote: 'Always by your side.',
    romanticDareOrAction: 'Remember the first time we talked? My heart knew immediately you were the one.'
  },
  {
    id: 'love-5',
    category: 'love_messages',
    title: 'My Forever Queen, Bayyan',
    body: 'No crown of gold could compare to the grace you carry, Bayyan. In the kingdom of my heart, you reign supreme. Every melody sounds like your name, and every flower blooms in your honor.',
    arabicSnippet: 'يا ملكة قلبي وأجمل أقداري يا بيان.',
    moodTag: 'Royal Adoration',
    senderNote: 'At your service, my love.',
    romanticDareOrAction: 'Take a deep breath and whisper "I am deeply loved" — because you truly are.'
  },
  {
    id: 'love-6',
    category: 'love_messages',
    title: 'Sweet Symphony of Us',
    body: 'Bayyan, loving you is like hearing my favorite song for the first time, yet knowing all the lyrics by heart. You complete every unfinished thought and soothe every worry.',
    arabicSnippet: 'صوتكِ لحن، ووجودكِ حياة كاملة يا بيان.',
    moodTag: 'Harmonious Love',
    senderNote: 'Always thinking of you.'
  },
  {
    id: 'love-7',
    category: 'love_messages',
    title: 'Safe In My Heart, Bayyan',
    body: 'Whatever life brings, Bayyan, remember that in my arms you will always find an unbreakable fortress of love, peace, and warmth. You will never walk alone.',
    arabicSnippet: 'بين أحضاني وفي قلبي، ستجدين دائماً الأمان يا بيان.',
    moodTag: 'Safe Haven',
    senderNote: 'My protective promise.'
  },
  {
    id: 'love-8',
    category: 'love_messages',
    title: 'You Are My Sunshine, Bayyan',
    body: 'Even on the cloudiest days, the mere thought of you, Bayyan, breaks through the grey like golden sunshine. Thank you for being my light and my joy.',
    arabicSnippet: 'أنتِ شمس أيامي وضيائها يا بيان.',
    moodTag: 'Radiant Joy',
    senderNote: 'Forever grateful for you.'
  },

  // ================= BOX 2: DEEP ROMANCE =================
  {
    id: 'romance-1',
    category: 'deep_romance',
    title: 'Two Souls Entwined, Bayyan',
    body: 'Our connection, Bayyan, transcends time and space. Long before our paths crossed, our souls recognized each other. With you, silence is poetry and every touch speaks a sacred language.',
    arabicSnippet: 'تلاقت أرواحنا قبل أن تلتقي أجسادنا، وأنتِ قدري الجميل يا بيان.',
    moodTag: 'Soulbound',
    senderNote: 'Bound to your soul forever.',
    romanticDareOrAction: 'Take a slow sip of water or tea, and imagine me sitting across from you, gazing softly into your eyes.'
  },
  {
    id: 'romance-2',
    category: 'deep_romance',
    title: 'Starlight Written in Your Name',
    body: 'I looked at the night sky and asked the stars how to describe my feelings for you, Bayyan. They whispered: "Count every grain of sand on every shore, and multiply by every star above—that is only the beginning of our love."',
    arabicSnippet: 'يا نجمتي المضيئة في عتمة الليل، حبكِ أوسع من كل المدارات.',
    moodTag: 'Cosmic Poetry',
    senderNote: 'Written under the moonlight.',
    romanticDareOrAction: 'Look up at the sky and blow a kiss into the air. I promise I will catch it.'
  },
  {
    id: 'romance-3',
    category: 'deep_romance',
    title: 'The Poetry of Holding You',
    body: 'When I wrap my arms around you, Bayyan, the whole universe holds its breath. There is no past, no future—just the rise and fall of your chest against mine and the sacred rhythm of our joined hearts.',
    arabicSnippet: 'العالم كله يختفي حين تكونين بين ذراعي يا بيان.',
    moodTag: 'Sacred Intimacy',
    senderNote: 'Craving that gentle warmth.'
  },
  {
    id: 'romance-4',
    category: 'deep_romance',
    title: 'A Love That Defies Time',
    body: 'Bayyan, beauty may fade with seasons, but the depth of what I feel for your spirit will only deepen with every passing year. Even in old age, I will look at you and see the breathtaking girl who stole my heart.',
    arabicSnippet: 'سأحبكِ في شيبنا كما أحببتكِ في شبابنا يا بيان.',
    moodTag: 'Timeless Devotion',
    senderNote: 'Until my very last breath.'
  },
  {
    id: 'romance-5',
    category: 'deep_romance',
    title: 'You Are My Destiny',
    body: 'I used to wonder why past roads were winding and steep, until I realized every step was guiding me straight to you, Bayyan. You are the reward for every patience I ever held.',
    arabicSnippet: 'كنتِ أنتِ الجائزة الكبرى التي انتظرها قلبي طويلاً.',
    moodTag: 'Destined Love',
    senderNote: 'Fate brought us together.'
  },
  {
    id: 'romance-6',
    category: 'deep_romance',
    title: 'A Whispered Prayer for Bayyan',
    body: 'In my quietest moments of prayer, your name is always the first whisper. I ask the heavens to protect your precious heart, bless your steps, and keep your smile shining forever.',
    arabicSnippet: 'دعائي الأول والأخير هو أن يحفظكِ الله لقلبي ويسعدكِ دائماً يا بيان.',
    moodTag: 'Spiritual Blessing',
    senderNote: 'Always in my prayers.'
  },
  {
    id: 'romance-7',
    category: 'deep_romance',
    title: 'The Scent of Roses and You',
    body: 'The sweetest pink roses in the world still envy the fragrance of your hair and the softness of your hands, Bayyan. Nature itself bows to your elegance.',
    arabicSnippet: 'الورد يستحي من جمالكِ ورقتكِ يا بيان.',
    moodTag: 'Floral Elegance',
    senderNote: 'Surrounding you with roses.'
  },

  // ================= BOX 3: HOT FEELINGS & PASSION =================
  {
    id: 'hot-1',
    category: 'hot_feelings',
    title: 'Electric Tension, Bayyan',
    body: 'Just the thought of your lips, Bayyan, sends an intoxicating wave of fire through my veins. When you whisper my name, my pulse quickens and my entire body craves the warmth of your touch.',
    arabicSnippet: 'نظرة واحدة منكِ يا بيان تشعل نيراناً لا يطفئها إلا قربك.',
    moodTag: 'Burning Desire',
    senderNote: 'Yearning for you right now.',
    romanticDareOrAction: 'Bite your lower lip softly and imagine the sweetest, slowest kiss landing right there.'
  },
  {
    id: 'hot-2',
    category: 'hot_feelings',
    title: 'Uncontrollable Attraction',
    body: 'Bayyan, you have this dangerous, irresistible magnetism. When you are close, every rational thought evaporates. All I can focus on is pulling you tight against me and feeling your breath against my skin.',
    arabicSnippet: 'جاذبيتكِ لا تُقاوم.. قربكِ يسلب العقل ويشعل الحواس يا بيان.',
    moodTag: 'Intense Chemistry',
    senderNote: 'Hopelessly addicted to you.',
    romanticDareOrAction: 'Touch your collarbone with your fingertips and feel the goosebumps of anticipation.'
  },
  {
    id: 'hot-3',
    category: 'hot_feelings',
    title: 'Late Night Whispers',
    body: 'Under the dim moonlight, Bayyan, I want to trace every curve of your back with gentle kisses, counting your soft sighs as the sweetest music in the dark. You are my sweetest obsession.',
    arabicSnippet: 'في هدوء الليل، لا أريد سوى أن أغرق في دفء عينيكِ وأنفاسكِ.',
    moodTag: 'Velvet Midnight',
    senderNote: 'Dreaming of our next private moment.',
    romanticDareOrAction: 'Send me a secret emoji right now that only you and I understand.'
  },
  {
    id: 'hot-4',
    category: 'hot_feelings',
    title: 'That Gaze of Yours, Bayyan',
    body: 'You know what you do to me when you look at me with that playful, seductive sparkle in your eyes? It turns my knees to water and makes my heart race like a wild thunderstorm.',
    arabicSnippet: 'تلك النظرة في عينيكِ يا بيان تكفي لتجعلني أسيركِ للأبد.',
    moodTag: 'Captivated Passion',
    senderNote: 'I am completely under your spell.'
  },
  {
    id: 'hot-5',
    category: 'hot_feelings',
    title: 'Craving Your Warmth',
    body: 'Distance is torture when all I want is to hold your waist, pull you into my chest, and kiss you until neither of us remembers where you end and I begin, Bayyan.',
    arabicSnippet: 'شوقي إليكِ نار لا تهدأ حتى أراكِ وأعانقكِ طويلاً.',
    moodTag: 'Deep Yearning',
    senderNote: 'Counting every second until I hold you.'
  },
  {
    id: 'hot-6',
    category: 'hot_feelings',
    title: 'My Sweetest Weakness',
    body: 'I can conquer anything in this world, Bayyan, but one soft touch from you, one whispered word in my ear, and I am completely surrendered. You hold all the power over my heart.',
    arabicSnippet: 'نقطة ضعفي الوحيدة والأجمل في هذا الكون هي أنتِ يا بيان.',
    moodTag: 'Sweet Surrender',
    senderNote: 'Yours in every way.'
  },
  {
    id: 'hot-7',
    category: 'hot_feelings',
    title: 'Fires in the Rain',
    body: 'Even if storms rage outside, inside the sanctuary of our love there is only sizzling warmth. You are the fire that keeps my soul burning with wild, fierce passion, Bayyan.',
    arabicSnippet: 'دفء حبكِ يذيب كل برد يا بيان القلب.',
    moodTag: 'Wild Flame',
    senderNote: 'Always burning for you.'
  },

  // ================= BOX 4: ROMANCE JOKES & SWEET BANTER =================
  {
    id: 'jokes-1',
    category: 'romance_jokes',
    title: 'Bayyan-itis Diagnosis!',
    body: 'Bayyan, I had to visit the doctor today because my heart wouldn\'t stop racing erratically. He checked my pulse, looked at me seriously, and said: "There\'s no cure, my friend. You have an acute, incurable case of Bayyan-itis!"',
    arabicSnippet: 'الطبيب قال لي: ما عندك علاج يا صاحبي، حالتك متقدمة جداً في حب بيان!',
    moodTag: 'Cheesy & Sweet',
    senderNote: 'And I refuse to ever recover! 😂❤️',
    romanticDareOrAction: 'Laugh out loud right now! Your laughter is literally my favorite sound.'
  },
  {
    id: 'jokes-2',
    category: 'romance_jokes',
    title: 'Do You Have a Band-Aid, Bayyan?',
    body: 'Excuse me Bayyan, do you have a band-aid? Because I just scraped my knee pretty badly falling for you for the 47,000th time today!',
    arabicSnippet: 'معكِ لاصق جروح يا بيان؟ لأني وقعت في حبك للمرة الألف اليوم!',
    moodTag: 'Playful Giggle',
    senderNote: 'Clumsy in love with you.',
    romanticDareOrAction: 'Give me your best eye-roll, because you know you secretly loved that line!'
  },
  {
    id: 'jokes-3',
    category: 'romance_jokes',
    title: 'Are You a Parking Ticket, Bayyan?',
    body: 'Are you a parking ticket, Bayyan? Because you’ve got "FINE" written all over you, and honestly, you\'ve illegally parked in my thoughts 24 hours a day without paying a single dime of rent!',
    arabicSnippet: 'مستأجرة عقلي وقلبي ٢٤ ساعة بدون إيجار يا بيان!',
    moodTag: 'Flirty Banter',
    senderNote: 'You own permanent residency in my mind.'
  },
  {
    id: 'jokes-4',
    category: 'romance_jokes',
    title: 'The Gravity Experiment',
    body: 'Scientists say gravity is the force that pulls objects toward Earth. Clearly, scientists have never met Bayyan, because your beauty has its own gravitational pull that keeps dragging my jaw straight to the floor!',
    arabicSnippet: 'الجاذبية الأرضية كلها بكفة، وجاذبية بيان بكفة تانية خالص!',
    moodTag: 'Witty Tease',
    senderNote: 'Still picking my jaw up off the floor.'
  },
  {
    id: 'jokes-5',
    category: 'romance_jokes',
    title: 'Are You a Magician, Bayyan?',
    body: 'Bayyan, are you secretly a Hogwarts graduate or a magician? Because every time you walk into the room, everybody else mysteriously disappears and my vision locks onto you like a laser!',
    arabicSnippet: 'سحر ولا حقيقة؟ لما تدخلي المكان، كل الناس تختفي وما يفضل إلا أنتِ!',
    moodTag: 'Magical Tease',
    senderNote: 'You cast a permanent spell on me.'
  },
  {
    id: 'jokes-6',
    category: 'romance_jokes',
    title: 'Copyright Infringement Warning',
    body: 'Attention Bayyan: It should be illegal to be this gorgeous and cute at the same time. The United Nations is preparing a treaty to regulate that smile because it causes mass cardiac arrest in my chest!',
    arabicSnippet: 'جمالكِ وابتسامتكِ محتاجين ترخيص دولي يا بيان لأنهم خطر على قلبي!',
    moodTag: 'Adorable Warning',
    senderNote: ' Guilty of grand theft of my heart.'
  },
  {
    id: 'jokes-7',
    category: 'romance_jokes',
    title: 'Wi-Fi Connection Check',
    body: 'Bayyan, is your name Wi-Fi? Because I\'m definitely feeling an instant, strong 5G connection, and I never want to disconnect from your network!',
    arabicSnippet: 'أقوى شبكة اتصال في حياتي هي الاتصال بقلبك يا بيان!',
    moodTag: 'Nerdy Romance',
    senderNote: 'Signal strength: 100% infinite.'
  },
  {
    id: 'jokes-8',
    category: 'romance_jokes',
    title: 'The Thief In The Night',
    body: 'Someone call 911! A girl named Bayyan just walked into my life, stole my heart, stole my sleep, hijacked my thoughts, and left behind a mountain of pink roses! Should I press charges or ask for a kiss?',
    arabicSnippet: 'سرقتي النوم والقلب يا بيان.. شو حكم المحكمة برأيك؟ قبلة ولا عناق؟',
    moodTag: 'Playful Criminal',
    senderNote: 'Sentence: Lifetime with me!'
  }
];
