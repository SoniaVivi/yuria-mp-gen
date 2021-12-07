const onOutsideClick = (
  toggle,
  event = null,
  target = null,
  logging = false
) => {
  let container;
  if (target == "parent") {
    container = event.target.parentNode;
  } else if (!target) {
    container = event.target;
  } else {
    container = target;
  }

  if (logging) {
    console.log(
      `onOutsideClick | Container: ${container} | Target: ${event.target}`
    );
  }

  const closeMenu = (mouseUpEvent) => {
    let clickedElement = mouseUpEvent.target;

    if (!container.contains(clickedElement) || clickedElement == container) {
      if (logging) {
        console.log(`onOutsideClick | Clicked Element: ${clickedElement}`);
      }
      toggle();
      document.removeEventListener("mouseup", closeMenu);
    }
  };
  document.addEventListener("mouseup", closeMenu);
};

export default onOutsideClick;
