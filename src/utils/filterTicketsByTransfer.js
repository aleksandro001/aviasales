const filterTicketsByTransfer = (ticket, showAllTickets, valueFilterTransfer) => {
  if (!showAllTickets) {
    return valueFilterTransfer.includes(
      ticket.segments
        .map((element) => element.stops.length)
        .reduce((previousValue, currentValue) => Math.max(previousValue, currentValue), 0)
    );
  }

  return true;
};

export default filterTicketsByTransfer;
