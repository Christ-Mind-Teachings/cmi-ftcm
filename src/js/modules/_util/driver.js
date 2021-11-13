import Driver from "driver.js";

export function pageDriver() {
  const driver = new Driver({
    allowClose: false,
    opacity: 0.5
  });

  let steps = [
    {
      element: "#source-homepage",
      popover: {
        title: "Title",
        description: "This is the homepage for <em>From the Christ Mind</em>.<br><br>Click on an image below to see the table of contents.",
        position: "bottom"
      }
    },
    {
      element: "#book-acq",
      popover: {
        title: "Get Acquainted",
        description: "Get help and learn about From the Christ Mind",
        position: "right"
      }
    },
    {
      element: "#book-one",
      popover: {
        title: "Book I",
        description: "The first book in the From the Christ Mind series",
        position: "top"
      }
    },
    {
      element: "#book-two",
      popover: {
        title: "Book II",
        description: "The second book in the From the Christ Mind series",
        position: "right"
      }
    }
  ];

  driver.defineSteps(steps);
  driver.start();
}

