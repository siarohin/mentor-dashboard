import ModalDialog from '.';


describe('ModalDialog', () => {
  it('draw template into the body', () => {
    const body = document.querySelector('body');

    const wrapper = '<div class=\'wrapper\'></div>';
    body.insertAdjacentHTML('beforeend', wrapper);

    ModalDialog.draw();

    const modalEl = document.querySelectorAll('.wrapper>#spels');

    expect(modalEl.length).toBe(1);
  });
});
