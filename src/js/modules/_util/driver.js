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
        description: "This is the homepage for <em>Choose Only Love</em>.<br><br>Click on an image below to see the table of contents.",
        position: "bottom"
      }
    },
    {
      element: "#book-acq",
      popover: {
        title: "Get Acquainted",
        description: "Get help and learn about Choose Only Love",
        position: "right"
      }
    },
    {
      element: "#book-one",
      popover: {
        title: "Echoes of Holiness",
        description: "The first book in the series of Choose Only Love",
        position: "left"
      }
    }
  ];

  driver.defineSteps(steps);
  driver.start();
}

