#include <QDebug>

#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "server.h"
#include "client.h"

MainWindow::MainWindow( QWidget* parent ) : QMainWindow( parent ), ui( new Ui::MainWindow ),
                                            i_dialog( new init_dialog ) {
    ui->setupUi( this );

    connect( i_dialog, &init_dialog::signal_isServer, this, &MainWindow::slot_isServer );
    connect( i_dialog, &init_dialog::signal_isClient, this, &MainWindow::slot_isClient );
    connect( ui->btn_exit, &QPushButton::clicked, this, &MainWindow::slot_onClickBtnExit);

    ui->console->hide();
    ui->type_box->hide();
    ui->btn_exit->hide();
    ui->btn_send->hide();

    i_dialog->show();
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::start() {
    if ( isServer && !isClient ) {
        ui->console->show();
        ui->btn_exit->show();
        server();
    } else if ( !isServer && isClient ) {
        ui->console->show();
        ui->type_box->show();
        ui->btn_exit->show();
        ui->btn_send->show();
//        new client;
    }
}

void MainWindow::slot_isServer() {
    isServer = true;
    isClient = false;
    i_dialog->close();
    start();
}

void MainWindow::slot_isClient() {
    isServer = false;
    isClient = true;
    i_dialog->close();
    start();
}

void MainWindow::slot_onClickBtnExit() {
    //disconnect + clean up
    close();
}
