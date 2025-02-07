import { ChannelUsabilityDataQuery } from "@dashboard/graphql";
import { OrderSharedType } from "@dashboard/orders/types";
import { Alert, AlertProps } from "@saleor/macaw-ui";
import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";

import OrderAlerts from "../OrderAlerts";
import { alertMessages } from "./messages";
import { useAlertStyles } from "./styles";

const getAlerts = (
  order?: OrderSharedType,
  channelUsabilityData?: ChannelUsabilityDataQuery,
) => {
  const canDetermineShippingMethods =
    order?.shippingAddress?.country.code && !!order?.lines?.length;

  const isChannelInactive = order && !order.channel.isActive;
  const noProductsInChannel = channelUsabilityData?.products.totalCount === 0;
  const noShippingMethodsInChannel =
    canDetermineShippingMethods && order?.shippingMethods.length === 0;

  let alerts: MessageDescriptor[] = [];

  if (isChannelInactive) {
    alerts = [...alerts, alertMessages.inactiveChannel];
  }
  if (noProductsInChannel) {
    alerts = [...alerts, alertMessages.noProductsInChannel];
  }
  if (noShippingMethodsInChannel) {
    alerts = [...alerts, alertMessages.noShippingMethodsInChannel];
  }

  return alerts;
};

export type OrderDraftAlertProps = Omit<AlertProps, "variant" | "close"> & {
  order?: OrderSharedType;
  channelUsabilityData?: ChannelUsabilityDataQuery;
};

const OrderDraftAlert: React.FC<OrderDraftAlertProps> = props => {
  const { order, channelUsabilityData, ...alertProps } = props;
  const classes = useAlertStyles();
  const intl = useIntl();

  const alerts = getAlerts(order, channelUsabilityData);

  if (!alerts.length) {
    return null;
  }

  return (
    <Alert variant="warning" close className={classes.root} {...alertProps}>
      <OrderAlerts
        alerts={alerts}
        alertsHeader={intl.formatMessage(alertMessages.manyAlerts)}
      />
    </Alert>
  );
};

OrderDraftAlert.displayName = "OrderDraftAlert";
export default OrderDraftAlert;
