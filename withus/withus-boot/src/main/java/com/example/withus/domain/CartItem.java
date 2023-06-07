package com.example.withus.domain;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.springframework.beans.support.PagedListHolder;

@SuppressWarnings("serial")
public class CartItem implements Serializable {

  private int groupItem_id;
  private int quantity;
  private String groupItem_name;
  private int groupItem_price;
  private int groupItem_rate;
  
public int getGroupItem_id() {
	return groupItem_id;
}
public void setGroupItem_id(int groupItem_id) {
	this.groupItem_id = groupItem_id;
}
public int getQuantity() {
	return quantity;
}
public void setQuantity(int quantity) {
	this.quantity = quantity;
}
public String getGroupItem_name() {
	return groupItem_name;
}
public void setGroupItem_name(String groupItem_name) {
	this.groupItem_name = groupItem_name;
}
public int getGroupItem_price() {
	return groupItem_price;
}
public void setGroupItem_price(int groupItem_price) {
	this.groupItem_price = groupItem_price;
}
public int getGroupItem_rate() {
	return groupItem_rate;
}
public void setGroupItem_rate(int groupItem_rate) {
	this.groupItem_rate = groupItem_rate;
}
@Override
public String toString() {
	return "CartItem [groupItem_id=" + groupItem_id + ", quantity=" + quantity + ", groupItem_name=" + groupItem_name
			+ ", groupItem_price=" + groupItem_price + ", groupItem_rate=" + groupItem_rate + "]";
}
  
  
}
