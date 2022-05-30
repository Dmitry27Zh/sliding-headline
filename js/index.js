import { initHeadlinesSliding } from "./modules/headline.js";
import { throttleEvent } from "./utils/throttle.js";

throttleEvent(window, 'scroll', 'optimizedScroll')
initHeadlinesSliding()
