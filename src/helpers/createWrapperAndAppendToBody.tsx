function createWrapperAndAppendToBody(wrapperId: string, customStyle?: Record<string, string>) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  if (customStyle) {
    Object.keys(customStyle).forEach((key: any) => {
      wrapperElement.style[key] = customStyle[key];
    });
  }
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export default createWrapperAndAppendToBody;
