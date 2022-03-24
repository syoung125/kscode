export const GA_TRACKING_ID = process.env.GA_MEASUREMENT_ID || "";

type GTagPageview = {
  url: URL;
  title?: string;
  href?: string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = ({ url, title, href }: GTagPageview) => {
  process.env.NODE_ENV === "production" &&
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
      page_location: href,
    });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  process.env.NODE_ENV === "production" &&
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
};
