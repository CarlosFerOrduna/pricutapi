export class CreatePurchaseOrder {
    constructor(purchaseOrder) {
        this.sellerCompanyName = purchaseOrder.sellerCompanyName || null
        this.sellerDeliveryAddress = purchaseOrder.sellerDeliveryAddress || null
        this.sellerTax = purchaseOrder.sellerTax || null
        this.sellerFiscalAddress = purchaseOrder.sellerFiscalAddress || null
        this.sellerEmail = purchaseOrder.sellerEmail || null
        this.sellerTel = purchaseOrder.sellerTel || null
        this.purchaserFullName = purchaseOrder.purchaserFullName || null
        this.purchaserDeliveryAddress = purchaseOrder.purchaserDeliveryAddress || null
        this.purchaserEmail = purchaseOrder.purchaserEmail || null
        this.purchaserTel = purchaseOrder.purchaserTel || null
        this.additionalData = purchaseOrder.additionalData || null
        this.purchaseOrderImageUrl = purchaseOrder.purchaseOrderImageUrl || null
        this.purchaseOrderDescription = purchaseOrder.purchaseOrderDescription || null
        this.purchaseOrderPrice = purchaseOrder.purchaseOrderPrice || null
        this.shipmentInformation = purchaseOrder.shipmentInformation || null
        this.shipmentPrice = purchaseOrder.shipmentPrice || null
        this.totalPrice = purchaseOrder.totalPrice || null
        this.status = purchaseOrder.status || null
    }
}
