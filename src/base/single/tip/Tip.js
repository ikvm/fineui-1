import React from "react";
import Portal from "../../overlays/Portal/Portal";

import Toast from "./toast";

let PortalRef;

const toast = (message, level, duration, container) => {
	if (!PortalRef) {
		PortalRef = Portal.PortalReference();
	}

	let tag = PortalRef._allocateTag();

	let handleClose = () => {
		PortalRef._closeModal(tag);
	};

	const toast = (
		<Toast
			onClose={handleClose}
			message={message}
			level={level}
			duration={duration}
			container={container}
		/>
	);

	PortalRef._showModal(tag, toast);
};

export default {
	toast
};
