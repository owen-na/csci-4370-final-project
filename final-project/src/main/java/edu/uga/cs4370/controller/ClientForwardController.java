package edu.uga.cs4370.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ClientForwardController {

  @GetMapping(value = "/**/{path:[^\\.]*}")
  public String forward() {
    return "forward:/";
  }
}
