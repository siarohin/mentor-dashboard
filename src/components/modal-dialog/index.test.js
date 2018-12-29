import ModalDialog from '.';


describe('ModalDialog', () => {
  it('draw template into the body', () => {
    ModalDialog.draw();
    const modalEl = document.querySelectorAll('body>#spels');

    expect(modalEl.length).toBe(1);
  });
});
