(function(){
  const container = document.getElementById('projects-container');
  if (!container) return;

  function makeCard(p) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.cursor = 'pointer';

    if (p.image) {
      const img = document.createElement('img');
      img.src = p.image;
      img.alt = p.title + ' image';
      img.loading = 'lazy';
      card.appendChild(img);
    }

    const a = document.createElement('a');
    a.className = 'project-title';
    a.textContent = p.title;
    a.href = p.link || '#';
    if (p.link && p.link.startsWith('http')) a.target = '_blank';
    card.appendChild(a);

    if (p.long) {
      const long = document.createElement('p');
      long.className = 'project-long';
      long.textContent = p.long;
      card.appendChild(long);
    }

    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A') {
        if (p.link && p.link.startsWith('http')) {
          window.open(p.link, '_blank');
        } else if (p.link) {
          window.location.href = p.link;
        }
      }
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
