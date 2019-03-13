#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QDebug>

MainWindow::MainWindow( QWidget* parent ) : QMainWindow( parent ), ui( new Ui::MainWindow ),
                                            i_dialog( new init_dialog ) {
    ui->setupUi( this );

    connect( i_dialog, &init_dialog::signal_isServer, this, &MainWindow::slot_isServer );
    connect( i_dialog, &init_dialog::signal_isClient, this, &MainWindow::slot_isClient );

    i_dialog->show();
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::start() {
    if ( isServer && !isClient ) {
        qDebug() << "server";
    } else if ( !isServer && isClient ) {
        qDebug() << "client";
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
