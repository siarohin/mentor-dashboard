import $ from 'jquery';
import Nav from '.';


window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };


describe('Nav', () => {
  it('draw template into the wrapper', () => {
    const body = document.querySelector('body');

    const wrapper = '<div class=\'wrapper\'></div>';
    $(body).append(wrapper);

    Nav.draw();
    const navTag = document.querySelectorAll('.wrapper > nav');

    expect(navTag.length).toBe(1);
    expect($('.nav-sound').hasClass('sound-off')).toBeTruthy();
  });


  it('check default state of sound buttom', () => {
    expect($('.nav-sound').hasClass('sound-on')).toBeFalsy();
  });


  it('toogle sound buttom', () => {
    $('.nav-sound').click();
    expect($('.nav-sound').hasClass('sound-off')).toBeFalsy();

    $('.nav-sound').click();
    expect($('.nav-sound').hasClass('sound-off')).toBeTruthy();
  });


  it('toogle sound notificator', () => {
    const soundNotificator = document.querySelector('.tooltip-sound');
    expect($(soundNotificator).hasClass('tooltip-sound_on')).toBeFalsy();

    $('.nav-sound').click();
    expect($(soundNotificator).hasClass('tooltip-sound_on')).toBeTruthy();
  });
});
