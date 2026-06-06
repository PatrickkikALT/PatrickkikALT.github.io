(function(){
  const containers = {
    games: document.getElementById('projects-games'),
    editor: document.getElementById('projects-editor'),
    misc: document.getElementById('projects-misc')
  };

  if (!containers.games && !containers.editor && !containers.misc) return;

  const categoryOrder = ['games', 'editor', 'misc'];

  const categorySets = {
    games: new Set(['chunivr', 'factory51', 'breakntake', 'pouventure', 'pestpatrol', 'bubblegame']),
    editor: new Set(['variablesignalreceiver', 'localisation']),
    misc: new Set(['massremovearcs', 'raylibminecraft', 'steganography', 'cpprenderer', 'storingbot', 'disruptiveaudiobot'])
  };

  function makeCard(p) {
    const card = document.createElement('div');
    card.className = 'project-card';

    if (p.thumbnail) {
      const img = document.createElement('img');
      img.src = p.thumbnail;
      img.alt = p.title + ' image';
      img.loading = 'lazy';
      card.appendChild(img);
    }

    const a = document.createElement('a');
    a.className = 'project-title';
    a.textContent = p.title;
    a.href = 'projects?id=' + encodeURIComponent(p.id);
    card.appendChild(a);

    if (p.description) {
      const desc = document.createElement('p');
      desc.className = 'project-long';
      desc.textContent = p.description;
      card.appendChild(desc);
    }

    card.addEventListener('click', function() {
      window.location.href = 'projects?id=' + encodeURIComponent(p.id);
    });

    return card;
  }

  function getCategory(project) {
    for (const category of categoryOrder) {
      if (categorySets[category].has(project.id)) return category;
    }

    return 'misc';
  }

  function renderCategory(category, projects) {
    const container = containers[category];
    if (!container) return;

    container.innerHTML = '';

    if (!projects.length) {
      container.innerHTML = '<p>No projects yet.</p>';
      return;
    }

    projects.forEach(p => container.appendChild(makeCard(p)));
  }

  fetch('projects.json')
    .then(r => {
      if (!r.ok) throw new Error('Fetch failed');
      return r.json();
    })
    .then(list => {
      const grouped = {
        games: [],
        editor: [],
        misc: []
      };

      list.forEach(p => {
        grouped[getCategory(p)].push(p);
      });

      categoryOrder.forEach(category => renderCategory(category, grouped[category]));
    })
    .catch(err => {
      console.error('Could not load projects.json', err);
      Object.values(containers).forEach(container => {
        if (container) container.innerHTML = '<p>Could not load projects list.</p>';
      });
    });

})();

