'use client';

import { useState } from 'react';
import MonogatariMaker from '../components/MonogatariMaker';
import PlayMode from '../components/PlayMode';

type Choice = {
  text: string;
  nextScene: string;
};

type Scene = {
  sceneId: string;
  text: string;
  choices: Choice[];
};

export default function Home() {
  const [title, setTitle] = useState<string>('タイトル未設定');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [mode, setMode] = useState<'edit' | 'play'>('edit');

  // 💾 JSON保存機能
  const handleSave = () => {
    const data = {
      title,
      scenes,
    };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monogatari.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 📂 JSON読み込み機能
  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target?.result as string);
      setTitle(json.title || 'タイトル未設定');
      setScenes(json.scenes || []);
    };
    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold">物語メーカー</h1>
        <div className="space-x-2">
          <button
            onClick={() => setMode(mode === 'edit' ? 'play' : 'edit')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {mode === 'edit' ? '▶ プレイモード' : '🛠 エディターモード'}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            💾 保存
          </button>
          <label className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer">
            📂 読み込み
            <input
              type="file"
              accept=".json"
              onChange={handleLoad}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* タイトル入力欄 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">📘 タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {mode === 'edit' ? (
        <MonogatariMaker initialScenes={scenes} onChange={setScenes} />
      ) : (
        <PlayMode scenes={scenes} />
      )}
    </main>
  );
}
