
let status_ = 0;
toggle();


function script() {

  function notifyEvent() {
    if (Notification.permission !== 'granted')
     Notification.requestPermission();
    else {
     var notification = new Notification('Risk Popup Removed!', {
      body: 'I successfully deleted the riskes popup of your pandabuy product page, you can now visit the product!',
     });
    }
   }
  

  function removeElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.remove();
    }
  }

  function elementExists(selector) {
    return !!document.querySelector(selector);
  }
  
  // Function to remove an element
  function removeElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.remove();
    }
  }

  function clearClasses(querySelector_) {
    document.querySelector(querySelector_).classList = []
  }
  
  // Function to wait for an element to be loaded and return a Promise
  function waitForElement(selector) {
    return new Promise(resolve => {
      const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && elementExists(selector)) {
            observer.disconnect();
            resolve();
          }
        }
      });
  
      observer.observe(document, { childList: true, subtree: true });
    });
  }

  async function waitAndRemoveTargetElement(targetSelector) {
    await waitForElement(targetSelector);
    removeElement(targetSelector);
  }

  async function waitAndCC(targetSelector) {
    await waitForElement(targetSelector);
    clearClasses(targetSelector);
  }


  waitAndRemoveTargetElement("#app > div.goods-detail > div.product-container > div > div > div:nth-child(4) > div > div.el-dialog__body");
  waitAndRemoveTargetElement("body > div.v-modal");
  waitAndRemoveTargetElement("#app > div.goods-detail > div.product-container > div > div > div.el-dialog__wrapper");
  waitAndRemoveTargetElement("#app > div.goods-detail > div.product-container > div > div > div:nth-child(4)");
  console.log('Blocked Risk POPUP !')
  setTimeout(() => {
    waitAndCC("body")
  }, 200);
  // notifyEvent();
}

chrome.webNavigation.onCompleted.addListener(async ({ tabId, url }) => {
  if (!url.includes("https://www.pandabuy.com/product?url=")) return;
  if (status_ === 0) return;

  chrome.scripting.executeScript({
    target: { tabId },
    function: script
  });
});

function toggle() {
  if (status_ === 0) {
    chrome.action.setBadgeText({text: "ON"})
    chrome.action.setBadgeBackgroundColor({color: "green"})
    status_++;
  } else if (status_ === 1) {
    chrome.action.setBadgeText({text: "OFF"})
    chrome.action.setBadgeBackgroundColor({color: "red"})
    status_++;
  }
  if (status_ > 1) {
    status_ = 0; // toggle
  }
}


chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "toggle") {
    toggle();
  }
});


