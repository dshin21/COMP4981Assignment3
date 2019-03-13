#include "init_dialog.h"

init_dialog::init_dialog( QDialog* parent ) : QDialog( parent ) {
    ui.setupUi( this );
    connect( ui.btn_server, &QPushButton::clicked, this, [ & ]() { emit signal_isServer(); } );
    connect( ui.btn_client, &QPushButton::clicked, this, [ & ]() { emit signal_isClient(); } );
}
