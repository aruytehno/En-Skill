var nav = document.getElementById("navigation");
/**
 * Формирование ссылок на пункты меню
 */
function linkHref(link, name) {
  return `<a class="nav-link" href="#" type="button" data-theme="${link}">${name}</a>`;
}

function subsubmenu(parent, childdata) {
  var submenumainlink = document.getElementById("submenu-" + parent.keyName);
  var submenu = document.createElement("ul");
  submenu.setAttribute("id", "submenu-" + parent.keyName + "-menu");
  submenumainlink.appendChild(submenu);

  var submenuId = document.getElementById("submenu-" + parent.keyName + "-menu");

  for (item of childdata) {
    var line = document.createElement("li");
    line.className = item.submenu ? "opened-for-codepen" : "nav-item";
    line.innerHTML = '<H3>' + linkHref(item.link, item.title) + '</H3>';

    if (item.submenu) {
      submenuId.appendChild(line);
      line.setAttribute("id", "submenu-" + item.keyName);
      subsubmenu(item, item.submenu);
    } else {
      submenuId.appendChild(line);
    }
  }
}

function submenu(parent, childdata) {
  var submenumainlink = document.getElementById("submenu-" + parent.keyName);
  var submenu = document.createElement("ul");
  submenu.setAttribute("id", "submenu-" + parent.keyName + "-menu");

  submenumainlink.appendChild(submenu);

  var submenuId = document.getElementById("submenu-" + parent.keyName + "-menu");

  for (item of childdata) {
    var line = document.createElement("li");
    line.className = item.submenu ? "nav-item submenu" : "nav-item";
    line.innerHTML = '<H2>' + linkHref(item.link, item.title) + '</H2>';

    if (item.submenu) {
      submenuId.appendChild(line);
      line.setAttribute("id", "submenu-" + item.keyName);
      subsubmenu(item, item.submenu);
    } else {
      submenuId.appendChild(line);
    }
  }
}

function createLink(data) {
  for (navLink of data) {
    var line = document.createElement("li");
    line.className = navLink.submenu ? "nav-item submenu" : "nav-item";
    line.innerHTML = '<H1>' + linkHref(navLink.link, navLink.title) + '</H1>';

    if (navLink.submenu) {
      //submenu(navLink, navLink.submenu);
      line.setAttribute("id", "submenu-" + navLink.keyName);
      nav.appendChild(line);
      submenu(navLink, navLink.submenu);
    } else {
      nav.appendChild(line);
    }
  }
  console.log(nav)
}

/**
 * Подгрузка JSON из файла
 */
fetch("./json/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Work with JSON data here
    createLink(data);
    // console.log(data);
  })
  .then(() => {
    selectTheme();
  })
  .catch((err) => {
    // Do something for an error here
  });
