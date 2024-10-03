export function eventHandler(arg, onClose?: () => void) {
    // In addition to general system errors, there are 2 specific errors
    // and one event that you can handle individually.

    switch (arg.error) {
      case 12002:
        console.log("Cannot load URL, no such page or bad URL syntax.");
        break;
      case 12003:
        console.log("HTTPS is required.");
        break;
      case 12006:
        // The dialog was closed, typically because the user the pressed X button.
        console.log("Dialog closed by user");
        onClose?.()
        break;
      default:
        console.log("Undefined error in dialog window");
        break;
    }
  }


  export function getSliceAsync(
    file: Office.File,
    nextSlice,
    sliceCount,
    gotAllSlices,
    docdataSlices,
    slicesReceived,
    callback
  ) {
    file.getSliceAsync(nextSlice, function (sliceResult) {
      if (sliceResult.status === Office.AsyncResultStatus.Succeeded) {
        if (!gotAllSlices) {
          // Failed to get all slices, no need to continue.
          return;
        }
  
        // Got one slice, store it in a temporary array.
        // (Or you can do something else, such as
        // send it to a third-party server.)
        docdataSlices[sliceResult.value.index] = sliceResult.value.data;
        if (++slicesReceived == sliceCount) {
          // All slices have been received.
          file.closeAsync();
          onGotAllSlices(docdataSlices, callback);
        } else {
          getSliceAsync(file, ++nextSlice, sliceCount, gotAllSlices, docdataSlices, slicesReceived, callback);
        }
      } else {
        gotAllSlices = false;
        file.closeAsync();
      }
    });
  }
  
  export function onGotAllSlices(docdataSlices, callback) {
    let docdata = [];
    for (let i = 0; i < docdataSlices.length; i++) {
      docdata = docdata.concat(docdataSlices[i]);
    }
    let fileContent = new String();
  
    for (let j = 0; j < docdata.length; j++) {
      fileContent += String.fromCharCode(docdata[j]);
    }
  
    //@ts-expect-error
    const mybase64 = window.btoa(fileContent);
  
    const url = "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64," + mybase64;
    callback(url)
    // fetch(url)
    //   .then((res) => res.blob())
    //   .then((blob) => {
    //     const documentFile = new File([blob], "ASDASD", {
    //       type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //     });
    //     callback(documentFile);
    //   });
  }