export type BoxCategory = 'love_messages' | 'deep_romance' | 'hot_feelings' | 'romance_jokes';

export interface LoveMessage {
  id: string;
  category: BoxCategory;
  title: string;
  body: string;
  arabicSnippet?: string;
  moodTag: string;
  senderNote?: string;
  romanticDareOrAction?: string;
}

export interface WallpaperTheme {
  id: string;
  name: string;
  previewColor: string;
  gradientClass: string;
  ambientTone: string;
  petalColors: string[];
}
