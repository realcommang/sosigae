package com.example.withus.controller;

import java.io.Serializable;

import com.example.withus.domain.Order;

@SuppressWarnings("serial")
public class OrderForm implements Serializable {

	private final Order order = new Order();
	private boolean shippingAddressRequired = false;
	private boolean shippingAddressProvided = false;

	public Order getOrder() {
		return order;
	}

	public void setShippingAddressRequired(boolean shippingAddressRequired) {
		this.shippingAddressRequired = shippingAddressRequired;
	}

	public boolean isShippingAddressRequired() {
		return shippingAddressRequired;
	}

	public void setShippingAddressProvided(boolean shippingAddressProvided) {
		this.shippingAddressProvided = shippingAddressProvided;
	}

	public boolean didShippingAddressProvided() {
		return shippingAddressProvided;
	}
}
