import Nav from './navigation';


describe('Nav', () => {
  it('draw template into the body', () => {
    Nav.draw();
    const navTag = document.querySelectorAll('body>nav');

    expect(navTag.length).toBe(1);
  });
});
