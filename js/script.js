// ページ表示を切り替える（切り替えボタンはアイコン表示）
// テーマを切り替えるボタン
const themeToggleButton = document.getElementById("toggle-theme");

// 現在のテーマを取得して適用
function setTheme(theme) {
  const icon = themeToggleButton.querySelector("i"); // ボタン内のアイコンを取得

  if (theme === "auto") {
    applyAutoTheme();
    icon.className = "bi bi-circle-half"; // Autoモードのアイコンに変更
    // themeToggleButton.textContent = " Autoモード";
  } else if (theme === "light-mode") {
    document.body.className = "light-mode";
    icon.className = "bi bi-sun"; // ダークモードのアイコンに変更
    // themeToggleButton.textContent = " ライトモード";
  } else {
    document.body.className = "dark-mode";
    icon.className = "bi bi-moon"; // ライトモードのアイコンに変更
    // themeToggleButton.textContent = " ダークモード";
  }

  themeToggleButton.prepend(icon); // アイコンをテキストの先頭に挿入
  localStorage.setItem("theme", theme); // 選択したテーマを保存
}

// OSのダークモード設定に基づいてテーマを適用
function applyAutoTheme() {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const autoTheme = prefersDarkScheme.matches ? "dark-mode" : "light-mode";
  document.body.className = autoTheme;
}

// ページ読み込み時のテーマの初期設定
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "auto";
  setTheme(savedTheme);
}

// 初期テーマを適用
initializeTheme();

// ボタンのクリックでテーマを順に切り替え
themeToggleButton.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "auto";
  let newTheme;

  if (currentTheme === "auto") {
    newTheme = "light-mode";
  } else if (currentTheme === "light-mode") {
    newTheme = "dark-mode";
  } else {
    newTheme = "auto";
  }

  setTheme(newTheme);
});

// prefers-color-scheme の変更を監視し、Autoモードの場合のみ自動的に切り替え
// 閲覧中にOSのテーマ設定を切り替えると、それを検知してページ表示を自動的に切り替える
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
prefersDarkScheme.addEventListener("change", () => {
  if (localStorage.getItem("theme") === "auto") {
    applyAutoTheme();
  }
});
