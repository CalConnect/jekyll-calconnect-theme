import '../js/theme.js'
import '../js/navigation.js'

document.addEventListener('DOMContentLoaded', function() {
  // Sidebar nav toggles
  document.querySelectorAll('.nav-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      this.classList.toggle('open');
      var subsection = this.nextElementSibling;
      if (subsection) subsection.classList.toggle('collapsed');
    });
  });

  // Code copy buttons
  document.querySelectorAll('.documentation .doc-content pre').forEach(function(pre) {
    var btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.addEventListener('click', function() {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;
      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });

  // Scroll progress bar
  var progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }
});
