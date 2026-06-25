export const categoryOrder = [
  { key: 'games', title: 'Games', description: 'My unity projects' },
  { key: 'editor', title: 'Editor', description: 'Tools built to smooth out Unity workflows.' },
  { key: 'misc', title: 'Misc', description: 'Miscellaneous projects.' },
];

export const categorySets = {
  games: new Set(['chunivr', 'factory51', 'breakntake', 'pouventure', 'pestpatrol', 'bubblegame']),
  editor: new Set(['variablesignalreceiver', 'localisation', 'scenelocktool']),
  misc: new Set(['massremovearcs', 'raylibminecraft', 'steganography', 'cpprenderer', 'storingbot', 'disruptiveaudiobot']),
};
