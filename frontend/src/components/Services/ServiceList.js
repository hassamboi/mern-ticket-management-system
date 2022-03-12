// react
import { Fragment } from "react";

// components
import ServiceItem from "./ServiceItem";

// responsible for mapping through all the services
export default function ServiceList({ services, setServices }) {
  return services.map((service, index) => (
    <Fragment key={index}>
      <ServiceItem title={service.title} desc={service.desc} icon={service.icon} />
    </Fragment>
  ));
}
