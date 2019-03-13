cmake_minimum_required(VERSION 3.13)

project(COMP4981Assignment3)

set(CMAKE_AUTOUIC ON) # if you have any .ui files
set(CMAKE_AUTOMOC ON) # if you have any .ui files
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
set(SOURCE_FILES main.cpp mainwindow.cpp mainwindow.h init_dialog.cpp init_dialog.h)

find_package(Qt5Core REQUIRED)
find_package(Qt5Gui REQUIRED)
find_package(Qt5Widgets REQUIRED)

add_executable(COMP4981Assignment3 ${SOURCE_FILES})
target_link_libraries(COMP4981Assignment3 Qt5::Widgets Qt5::Core)