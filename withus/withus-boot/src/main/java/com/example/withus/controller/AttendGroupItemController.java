package com.example.withus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.withus.domain.AttendGroupItem;
import com.example.withus.service.AttendGroupItemService;


@RestController

public class AttendGroupItemController {
	@Autowired
	private AttendGroupItemService attendGroupItemService;

	
	@GetMapping(value = "/insertGroup/{user_id}/{groupItem_id}")
    public AttendGroupItem getGroupItem(@PathVariable("user_id") String user_id,@PathVariable("groupItem_id") int groupItem_id) {

		AttendGroupItem attendGroupItem = new AttendGroupItem();
		attendGroupItem.setUser_id(user_id);
		attendGroupItem.setGroupItem_id(groupItem_id);
		attendGroupItem.setUser_name("혜연"); //나중에 MemberSerivce로 바꾸기
		attendGroupItem.setTotalGroupItem_count(1);
		attendGroupItemService.insertAttendGroupItem(attendGroupItem);
		System.out.println(attendGroupItem);
        return attendGroupItem;
    }
	
	@GetMapping(value = "/attendgroupList")
    public List<AttendGroupItem> groupList() {
		return attendGroupItemService.getAttendGroupItemList();
    }

	
}
