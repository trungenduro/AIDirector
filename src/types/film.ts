export type ShotType = 'EWS' | 'WS' | 'MS' | 'MCU' | 'CU' | 'ECU' | 'OTS' | 'POV' | 'BIRD_EYE';

export type CameraMovement = 
  | 'Static' 
  | 'Dolly In' 
  | 'Dolly Out' 
  | 'Pan Left' 
  | 'Pan Right' 
  | 'Tilt Up' 
  | 'Tilt Down' 
  | 'Tracking Shot' 
  | 'Orbit 360' 
  | 'Handheld Gritty' 
  | 'Crane Shot'
  | 'Whip Pan';

export interface ShotDialogue {
  speaker: string;
  text: string;
  tone: string;
  audioUrl?: string;
}

export interface ShotAudioDesign {
  ambient: string;
  sfx: string[];
  musicMood: string;
}

export interface Shot {
  id: string;
  shotNumber: number;
  sceneNumber: number;
  title: string;
  shotType: ShotType | string;
  cameraMovement: CameraMovement | string;
  lens: string;
  lighting: string;
  actionDescription: string;
  dialogue?: ShotDialogue;
  veoPrompt: string;
  imagePrompt: string;
  audioDesign: ShotAudioDesign;
  duration: number; // in seconds
  storyboardUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  isGeneratingStoryboard?: boolean;
  isGeneratingVideo?: boolean;
  isGeneratingAudio?: boolean;
  status?: 'planned' | 'storyboard_ready' | 'rendered';
}

export interface Scene {
  sceneNumber: number;
  heading: string;
  summary: string;
  shots: Shot[];
}

export interface ScreenplayProject {
  id?: string;
  title: string;
  logline: string;
  synopsis?: string;
  directorVision: string;
  genre: string;
  style: string;
  pacing: string;
  aspectRatio: '16:9' | '2.39:1' | '9:16';
  scenes: Scene[];
  createdAt?: number;
  updatedAt?: number;
}

export interface SavedProjectMeta {
  id: string;
  title: string;
  genre: string;
  aspectRatio: string;
  scenesCount: number;
  shotsCount: number;
  totalDuration: number;
  coverImage?: string;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  sender: 'director' | 'co-director' | 'system';
  text: string;
  timestamp: string;
  shotId?: string;
  suggestedAction?: 'update_shot' | 'add_shot' | 'advice_only';
  updatedShotData?: Partial<Shot>;
}

export type DirectorTab = 'script' | 'breakdown' | 'storyboard' | 'refine' | 'producer' | 'master';
