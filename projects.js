(function(){
  const container = document.getElementById('projects-container');
  if (!container) return;

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

  fetch('projects.json')
    .then(r => {
      if (!r.ok) throw new Error('Fetch failed');
      return r.json();
    })
    .then(list => {
      container.innerHTML = '';
      list.forEach(p => container.appendChild(makeCard(p)));
    })
    .catch(err => {
      console.error('Could not load projects.json', err);
      container.innerHTML = '<p>Could not load projects list.</p>';
    });

})();

