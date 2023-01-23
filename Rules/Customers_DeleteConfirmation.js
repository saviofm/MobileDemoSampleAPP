export default function DeleteConfirmation(context) {
    return context.executeAction('/MobileDemoSampleApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return context.executeAction('/MobileDemoSampleApp/Actions/Customers_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

