var lstsis = "";
var lstsisurl = "";

(function (window) {
  "use strict";

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function CBPFWTabs(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  CBPFWTabs.prototype.options = {
    start: 0
  };

  CBPFWTabs.prototype._init = function () {
    //elemnto tabs
    this.tabs = [].slice.call(this.el.querySelectorAll("nav > ul > li"));
    // content items
    this.items = [].slice.call(
      this.el.querySelectorAll(".content-wrap > section")
    );
    // current index
    this.current = -1;
    // show current content item
    this._show();
    // init events
    this._initEvents();
  };

  CBPFWTabs.prototype._initEvents = function () {
    var self = this;
    this.tabs.forEach(function (tab, idx) {
      tab.addEventListener("click", function (ev) {
        ev.preventDefault();
        self._show(idx);
      });
    });
  };

  CBPFWTabs.prototype._show = function (idx) {
    if (this.current >= 0) {
      this.tabs[this.current].className = this.items[this.current].className =
        "";
    }
    // change current
    this.current =
      idx != undefined
        ? idx
        : this.options.start >= 0 && this.options.start < this.items.length
        ? this.options.start
        : 0;
    this.tabs[this.current].className = "tab-current";
    this.items[this.current].className = "content-current";
  };

  // add to global namespace
  window.CBPFWTabs = CBPFWTabs;
})(window);

(function () {
  [].slice.call(document.querySelectorAll(".tabs")).forEach(function (el) {
    new CBPFWTabs(el);
  });
})();

function renderList(filter = "") {
  let inputHtml = "";
  let filteredList = [];
  let linkList = [];

  if (filter.length > 0) {
    filteredList = lstsis.filter((item, index) => {
      if (item.toLowerCase().includes(filter.toLowerCase())) {
        linkList.push(lstsisurl[index]);
        return true;
      } else {
        return false;
      }
    });
  }  
}

$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

function geral() {
  $(".display").css("display", "none");
  $(".atalhos").css("display", "block");
  $("#page-content-wrapper").removeClass("d-none");
}

//Click Sidenav menu
$(".list-group a").click(function () {
  $(".list-group a.text-secondary").removeClass("active");
  $("html, body").animate({ scrollTop: 0 }, 500); //Scroll top para suavizar a troca de tela
  $(this).addClass("active");

  //Array de classes verificadas na Sidenav
  const arrayMenu = ["home", "acad", "adm", "hability", "project", "teste"];

  for (var i = 0; i < arrayMenu.length; i++) {
    if ($(this).hasClass(arrayMenu[i])) {
      geral();
      $("." + arrayMenu[i] + ".display").css("display", "block");
    }
  }
});
