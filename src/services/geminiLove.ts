import { BoxCategory } from '../types';

export async function generateGeminiLoveWhisper(
  category: BoxCategory,
  userCustomPrompt?: string
): Promise<{ title: string; body: string; arabicSnippet?: string; moodTag: string }> {
  try {
    const response = await fetch('/api/whisper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, prompt: userCustomPrompt }),
    });

    if (!response.ok) {
      throw new Error('Server returned error');
    }

    const data = await response.json();
    return data;
  } catch {
    // Elegant client-side romantic fallback generation in case server is in client-only mode
    const fallbacks: Record<BoxCategory, { title: string; body: string; arabicSnippet: string; moodTag: string }[]> = {
      love_messages: [
        {
          title: 'You Are My Forever Home, Bayyan',
          body: 'Bayyan, no matter where life takes me, home is always right beside you. Every beat of my heart is an eternal love letter dedicated to your happiness.',
          arabicSnippet: 'أنتِ وطني وملاذي الأبدي يا بيان.',
          moodTag: 'Endless Love'
        },
        {
          title: 'My Heart’s Sweetest Treasure',
          body: 'If love were raindrops, Bayyan, I would send you an ocean. You bring out the purest and happiest parts of who I am.',
          arabicSnippet: 'أنتِ أثمن كنوز قلبي يا أغلى من روحي يا بيان.',
          moodTag: 'Tender Adoration'
        }
      ],
      deep_romance: [
        {
          title: 'Written in the Stardust, Bayyan',
          body: 'Before galaxies took form, my soul was already dreaming of finding you, Bayyan. When we hold hands, the universe finally feels in perfect alignment.',
          arabicSnippet: 'حبنا مكتوب بين النجوم ومحفور في أعماق روحي يا بيان.',
          moodTag: 'Cosmic Soul'
        },
        {
          title: 'In The Quiet Hours',
          body: 'When the world falls asleep, Bayyan, my thoughts remain awake just to keep company with the memory of your sweet voice and radiant eyes.',
          arabicSnippet: 'في سكون الليل، لا يشغل قلبي وفكري سواكِ يا بيان.',
          moodTag: 'Midnight Reverie'
        }
      ],
      hot_feelings: [
        {
          title: 'A Flame That Never Fades',
          body: 'Bayyan, every second away from you feels like an eternity of longing. Your beauty leaves me breathless and completely captivated.',
          arabicSnippet: 'شوقي لكِ نار مشتعلة لا تنطفئ يا بيان.',
          moodTag: 'Unstoppable Passion'
        },
        {
          title: 'The Sweetest Intoxication',
          body: 'One glance from you, Bayyan, and all my composure melts away. Your lips, your perfume, your gentle touch—I crave you endlessly.',
          arabicSnippet: 'سحر أنوثتكِ يسلب إرادتي بالكامل يا بيان.',
          moodTag: 'Sweet Surrender'
        }
      ],
      romance_jokes: [
        {
          title: 'Are You a Solar Flare, Bayyan?',
          body: 'Because every time you smile at me, all my communication satellites get completely disrupted and I forget how to form complete sentences!',
          arabicSnippet: 'جمالكِ بيعمل تشويش على كل حواسي يا بيان!',
          moodTag: 'Sweet Laughs'
        },
        {
          title: 'Emergency Sweetness Alert',
          body: 'Bayyan, I might have to report you to the department of sweetness. You are exceeding the legal threshold of cuteness by at least 1000%!',
          arabicSnippet: 'حلاوتكِ تعدت كل المقاييس القانونية يا بيان!',
          moodTag: 'Playful Giggle'
        }
      ]
    };

    const categoryList = fallbacks[category];
    const picked = categoryList[Math.floor(Math.random() * categoryList.length)];
    return picked;
  }
}
