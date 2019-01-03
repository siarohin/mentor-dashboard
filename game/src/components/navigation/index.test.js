import Nav from '.';


describe('Nav', () => {
  it('draw template into the wrapper', () => {
    const body = document.querySelector('body');

    const wrapper = '<div class=\'wrapper\'></div>';
    body.insertAdjacentHTML('afterbegin', wrapper);

    Nav.draw();
    const navTag = document.querySelectorAll('.wrapper > nav');

    expect(navTag.length).toBe(1);
  });
});
