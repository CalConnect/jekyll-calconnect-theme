/**
 * Navigation Script
 * Handles mobile menu toggle, sidebar drawer, and active state highlighting
 */

(function() {
  'use strict';

  /**
   * Initialize mobile menu / sidebar drawer
   * On docs pages: hamburger opens sidebar drawer
   * On other pages: hamburger opens dropdown menu
   */
  function initMobileMenu() {
    var menuButton = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var sidebar = document.querySelector('.docs-nav');
    var backdrop = document.querySelector('.docs-nav-backdrop');

    if (!menuButton) return;

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
    }

    menuButton.addEventListener('click', function() {
      if (sidebar) {
        var isOpen = sidebar.classList.contains('mobile-open');
        if (isOpen) {
          closeSidebar();
        } else {
          sidebar.classList.add('mobile-open');
          if (backdrop) backdrop.classList.add('active');
          menuButton.setAttribute('aria-expanded', 'true');
        }
      } else if (mobileMenu) {
        var isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeSidebar);
    }
  }

  /**
   * Highlight active navigation items
   */
  function initActiveNav() {
    var currentPath = window.location.pathname;

    // Sidebar navigation
    var sidebarLinks = document.querySelectorAll('.docs-nav .nav-items a');
    sidebarLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href) {
        var linkPath = href.replace(/\/$/, '');
        var pagePath = currentPath.replace(/\/$/, '');
        if (linkPath === pagePath) {
          link.classList.add('active');
        }
      }
    });

    // Header navigation
    var headerLinks = document.querySelectorAll('#nav-header nav a[href]');
    headerLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href !== '/') {
        var linkPath = href.replace(/\/$/, '');
        var pagePath = currentPath.replace(/\/$/, '');
        if (pagePath.indexOf(linkPath) === 0) {
          link.classList.add('active');
        }
      }
    });
  }

  /**
   * Initialize on DOM ready
   */
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initActiveNav();
  });
})();
