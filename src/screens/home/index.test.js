import Home from '.';


describe('Home', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <div class="container" id="content"></div>
        `;
  });
  it('draw template into the body', () => {
    Home.draw();
    const homeTag = document.querySelectorAll('body>#content>header');

    expect(homeTag.length).toBe(1);
  });
});
