export class UpdatePurchaseOrder {
    constructor(purchaseOrder) {
        this._id = purchaseOrder._id
        if (purchaseOrder.sellerCompanyName) this.sellerCompanyName = purchaseOrder.sellerCompanyName
        if (purchaseOrder.sellerDeliveryAddress) this.sellerDeliveryAddress = purchaseOrder.sellerDeliveryAddress
        if (purchaseOrder.sellerTax) this.sellerTax = purchaseOrder.sellerTax
        if (purchaseOrder.sellerFiscalAddress) this.sellerFiscalAddress = purchaseOrder.sellerFiscalAddress
        if (purchaseOrder.sellerEmail) this.sellerEmail = purchaseOrder.sellerEmail
        if (purchaseOrder.sellerTel) this.sellerTel = purchaseOrder.sellerTel
        if (purchaseOrder.purchaserFullName) this.purchaserFullName = purchaseOrder.purchaserFullName
        if (purchaseOrder.purchaserDeliveryAddress)
            this.purchaserDeliveryAddress = purchaseOrder.purchaserDeliveryAddress
        if (purchaseOrder.purchaserEmail) this.purchaserEmail = purchaseOrder.purchaserEmail
        if (purchaseOrder.purchaserTel) this.purchaserTel = purchaseOrder.purchaserTel
        if (purchaseOrder.additionalData) this.additionalData = purchaseOrder.additionalData
        if (purchaseOrder.productImageUrl) this.productImageUrl = purchaseOrder.productImageUrl
        if (purchaseOrder.productDescription) this.productDescription = purchaseOrder.productDescription
        if (purchaseOrder.productPrice) this.productPrice = purchaseOrder.productPrice
        if (purchaseOrder.shipmentInformation) this.shipmentInformation = purchaseOrder.shipmentInformation
        if (purchaseOrder.shipmentPrice) this.shipmentPrice = purchaseOrder.shipmentPrice
        if (purchaseOrder.totalPrice) this.totalPrice = purchaseOrder.totalPrice
        if (purchaseOrder.status) this.status = purchaseOrder.status
    }
}
