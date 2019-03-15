cmake_minimum_required(VERSION 3.13)
project(COMP4981Assignment3_client)

set(CMAKE_CXX_STANDARD 14)
set(THREADS_PREFER_PTHREAD_FLAG ON)

find_package(Threads REQUIRED)

add_executable(COMP4981Assignment3_client client.cpp client.h)

target_link_libraries(COMP4981Assignment3_client pthread)
