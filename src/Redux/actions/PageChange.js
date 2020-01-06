export default function PageChange(Page) {
  localStorage.setItem('Pageselected', Page);
  return { type: 'Page_Change', payload: Page };
}
