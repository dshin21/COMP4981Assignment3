cmake_minimum_required(VERSION 3.13)
project(sand_box)

set(CMAKE_CXX_STANDARD 11)

add_executable(sand_box main.cpp client.c server.c uthash.h)