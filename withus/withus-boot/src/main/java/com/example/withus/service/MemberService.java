package com.example.withus.service;

import com.example.withus.domain.Member;

public interface MemberService {
	Member findByIdAndPassword(String user_id, String password);
}
