const mapping = {
  "metro-flow-1": {
    search_route: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.intent.fulfillment.vehicle.category",
          value: "data.vehicleCategaory || session.vehicleCategaory",
        },
        {
          beckn_key: "message.intent.payment.tags",
          value: "data.paymentTagsSearch",
          compute: "buildTags(data.paymentTagsSearch)",
        },
      ],
    },
    search_trip: {
      sessionData: [
        {
          beckn_key: "currentTransactionId",
          value: "newTranscationId",
        },
        {
          beckn_key: "transactionIds",
          value: "[...session.transactionIds, newTranscationId]",
        },
      ],
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "data.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "data.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.intent.fulfillment.stops[0].type",
          value: "startPoint",
          check: "data?.startStop",
        },
        {
          beckn_key:
            "message.intent.fulfillment.stops[0].location.descriptor.code",
          value: "data?.startStop",
        },
        {
          beckn_key: "message.intent.fulfillment.stops[1].type",
          value: "endPoint",
          check: "data?.endStop",
        },
        {
          beckn_key:
            "message.intent.fulfillment.stops[1].location.descriptor.code",
          value: "data?.endStop",
        },
        {
          beckn_key: "message.intent.fulfillment.vehicle.category",
          value: "data.vehicleCategaory || session.vehicleCategaory",
        },
        {
          beckn_key: "message.intent.payment.tags",
          value: "data.paymentTags || session.paymentTagsSearch",
          compute: "buildTags(data.paymentTags || session.paymentTagsSearch)",
        },
      ],
    },
    select: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "data.itemId",
        },
        {
          beckn_key: "message.order.items[0].quantity.selected.count",
          value: "parseInt(data.quantity)",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "data.providerId",
        },
      ],
    },
    init: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].quantity.selected.count",
          value: "session.quantitySelected",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.billing.name",
          value: "data.name",
        },
        {
          beckn_key: "message.order.billing.email",
          value: "data.email",
        },
        {
          beckn_key: "message.order.billing.phone",
          value: "data.phone",
        },
        {
          beckn_key: "message.order.payments[0].collected_by",
          value: "session.collectedBy",
        },
        {
          beckn_key: "message.order.payments[0].status",
          value: "data.paymentStatus",
        },
        {
          beckn_key: "message.order.payments[0].type",
          value: "data.paymentType",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_code",
          value: "session.bankCode",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_account_number",
          value: "session.bankAccountNumber",
        },
        {
          beckn_key: "message.order.payments[0].params.virtual_payment_address",
          value: "session.virtualPaymentAddress",
        },
        {
          beckn_key: "message.order.payments[0].tags",
          value: "data.paymentTagsInit",
          compute: "buildTags(data.paymentTagsInit)",
        },
      ],
    },
    confirm: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].quantity.selected.count",
          value: "session.quantitySelected",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.billing.name",
          value: "session.name",
        },
        {
          beckn_key: "message.order.billing.email",
          value: "session.email",
        },
        {
          beckn_key: "message.order.billing.phone",
          value: "session.phone",
        },
        {
          beckn_key: "message.order.payments[0].id",
          value: "data.paymentId",
        },
        {
          beckn_key: "message.order.payments[0].collected_by",
          value: "session.collectedBy",
        },
        {
          beckn_key: "message.order.payments[0].status",
          value: "data.paymentStatusConfirm",
        },
        {
          beckn_key: "message.order.payments[0].type",
          value: "data.paymentTypeConfirm",
        },
        {
          beckn_key: "message.order.payments[0].params.transaction_id",
          value: "data.paymentTranscationId",
        },
        {
          beckn_key: "message.order.payments[0].params.currency",
          value: "data.currency",
        },
        {
          beckn_key: "message.order.payments[0].params.amount",
          value: "data.amount",
        },
        {
          beckn_key: "message.order.payments[0].tags",
          value: "data.paymentTagsConfirm",
          compute: "buildTags(data.paymentTagsConfirm)",
        },
      ],
    },
    status: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order_id",
          value: "data.orderId",
        },
      ],
    },
    on_search: {
      mapping: [
        {
          business_key: "name",
          extractionPath: "message.catalog.descriptor.name",
        },
        {
          business_key: "bpp_id",
          extractionPath: "context.bpp_id",
        },
        {
          business_key: "bpp_uri",
          extractionPath: "context.bpp_uri",
        },
        {
          business_key: "location",
          extractionPath:
            "message.catalog.providers[].fulfillments[].stops[]{locationName: location.descriptor.code}",
        },
        {
          business_key: "items",
          extractionPath:
            "message.catalog.providers[]{providerId: id}.items[]{id: id, name: descriptor.name}",
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_select: {
      mapping: [
        {
          business_key: "breakup",
          extractionPath:
            "message.order.quote.breakup[]{type: title, totalPrice: price.value, UOP: price.currency}",
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_init: {
      sessionData: [
        {
          business_key: "paymentID",
          extractionPath: "message.order.payments[]{id: id}",
        },
        {
          business_key: "totalPrice",
          extractionPath: "message.order.quote.price",
        },
      ],
      mapping: [
        {
          business_key: "paymentDetails",
          extractionPath:
            "message.order.payments[]{id: id, type: type, status: status}",
        },
        {
          business_key: "totalPrice",
          extractionPath: "message.order.quote.price",
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_confirm: {
      mapping: [
        {
          business_key: "orderId",
          extractionPath: "message.order.id",
        },
        {
          business_key: "status",
          extractionPath: "message.order.status",
        },
        {
          business_key: "QR code",
          extractionPath:
            'message.order.fulfillments[]{providerId: id}.stops[?(type === "START")]{token: authorization.token, status: authorization.status}',
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_status: {
      mapping: [
        {
          business_key: "status",
          extractionPath: "message.order.status",
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
  },
  "personal-loan-flow-1": {
    search: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.intent.category.descriptor.code",
          value: "data.loanCategaory",
        },
        {
          beckn_key: "message.intent.payment.collected_by",
          value: "session.paymentCollectedBy",
        },
        {
          beckn_key: "message.intent.payment.tags",
          value: "data.paymentTagsSearch",
          compute: "buildTags(data.paymentTagsSearch)",
        },
      ],
    },
    select_loan: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form.id",
          value: "session.formId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form_response.status",
          value: "successStatus",
        },
        {
          beckn_key:
            "message.order.items[0].xinput.form_response.submission_id",
          value: "data.personalInfoSubmissionId",
        },
      ],
    },
    select_approval: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form.id",
          value: "session.formId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form_response.status",
          value: "data.consentStatus",
        },
        {
          beckn_key:
            "message.order.items[0].xinput.form_response.submission_id",
          value: "session.personalInfoSubmissionId",
        },
      ],
    },
    select_after_amount_adjust: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form.id",
          value: "data.formIdAmountAdjustForm",
        },
        {
          beckn_key: "message.order.items[0].xinput.form_response.status",
          value: "successStatus",
        },
        {
          beckn_key:
            "message.order.items[0].xinput.form_response.submission_id",
          value: "data.adjustAmountSubmissionId",
        },
      ],
    },
    init_kyc: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form.id",
          value: "data.kycFormId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form_response.status",
          value: "successStatus",
        },
        {
          beckn_key:
            "message.order.items[0].xinput.form_response.submission_id",
          value: "data.kycSubmissionId",
        },
        {
          beckn_key: "message.order.payments[0].collected_by",
          value: "session.collectedBy",
        },
        {
          beckn_key: "message.order.payments[0].status",
          value: "data.paymentStatus",
        },
        {
          beckn_key: "message.order.payments[0].type",
          value: "data.paymentType",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_code",
          value: "session.bankCode",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_account_number",
          value: "session.bankAccountNumber",
        },
        {
          beckn_key: "message.order.payments[0].params.virtual_payment_address",
          value: "session.virtualPaymentAddress",
        },
        {
          beckn_key: "message.order.payments[0].tags",
          value: "data.paymentTagsInit",
          compute: "buildTags(data.paymentTagsInit)",
        },
      ],
    },
    init_personal_loan: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form.id",
          value: "data.accointDetailsFormId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form_response.status",
          value: "successStatus",
        },
        {
          beckn_key:
            "message.order.items[0].xinput.form_response.submission_id",
          value: "data.accointDetailsFormSubmissionId",
        },
        {
          beckn_key: "message.order.payments[0].id",
          value: "session.paymentID[0].id",
        },
        {
          beckn_key: "message.order.payments[0].collected_by",
          value: "session.collectedBy",
        },
        {
          beckn_key: "message.order.payments[0].status",
          value: "data.paymentStatus",
        },
        {
          beckn_key: "message.order.payments[0].type",
          value: "data.paymentType",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_code",
          value: "session.bankCode",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_account_number",
          value: "session.bankAccountNumber",
        },
        {
          beckn_key: "message.order.payments[0].params.virtual_payment_address",
          value: "session.virtualPaymentAddress",
        },
        {
          beckn_key: "message.order.payments[0].tags",
          value: "data.paymentTagsInit",
          compute: "buildTags(data.paymentTagsInit)",
        },
      ],
    },
    init_with_account_details: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form.id",
          value: "data.eMandateDetailsFormId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form_response.status",
          value: "successStatus",
        },
        {
          beckn_key:
            "message.order.items[0].xinput.form_response.submission_id",
          value: "data.eMandateDetailsSubmissionId",
        },
        {
          beckn_key: "message.order.payments[0].id",
          value: "session.paymentID[0].id",
        },
        {
          beckn_key: "message.order.payments[0].collected_by",
          value: "session.collectedBy",
        },
        {
          beckn_key: "message.order.payments[0].status",
          value: "data.paymentStatus",
        },
        {
          beckn_key: "message.order.payments[0].type",
          value: "data.paymentType",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_code",
          value: "session.bankCode",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_account_number",
          value: "session.bankAccountNumber",
        },
        {
          beckn_key: "message.order.payments[0].params.virtual_payment_address",
          value: "session.virtualPaymentAddress",
        },
        {
          beckn_key: "message.order.payments[0].tags",
          value: "session.paymentTagsInit",
          compute: "buildTags(session.paymentTagsInit)",
        },
      ],
    },
    confirm: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.order.provider.id",
          value: "session.providerId",
        },
        {
          beckn_key: "message.order.items[0].id",
          value: "session.itemId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form.id",
          value: "data.loanAgreementFormId",
        },
        {
          beckn_key: "message.order.items[0].xinput.form_response.status",
          value: "successStatus",
        },
        {
          beckn_key:
            "message.order.items[0].xinput.form_response.submission_id",
          value: "data.loanAgreementSubmissionId",
        },
        {
          beckn_key: "message.order.payments[0].id",
          value: "session.paymentID[0].id",
        },
        {
          beckn_key: "message.order.payments[0].collected_by",
          value: "session.collectedBy",
        },
        {
          beckn_key: "message.order.payments[0].status",
          value: "data.paymentStatus",
        },
        {
          beckn_key: "message.order.payments[0].type",
          value: "data.paymentType",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_code",
          value: "session.bankCode",
        },
        {
          beckn_key: "message.order.payments[0].params.bank_account_number",
          value: "session.bankAccountNumber",
        },
        {
          beckn_key: "message.order.payments[0].params.virtual_payment_address",
          value: "session.virtualPaymentAddress",
        },
        {
          beckn_key: "message.order.payments[0].tags",
          value: "session.paymentTagsInit",
          compute: "buildTags(session.paymentTagsInit)",
        },
      ],
    },
    status: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.ref_id",
          value: "session.currentTransactionId",
        },
      ],
    },
    update: {
      mapping: [
        {
          beckn_key: "context.bap_id",
          value: "session.bap_id",
        },
        {
          beckn_key: "context.bap_uri",
          value: "session.bap_uri",
        },
        {
          beckn_key: "context.bpp_id",
          value: "session.bpp_id",
        },
        {
          beckn_key: "context.bpp_uri",
          value: "session.bpp_uri",
        },
        {
          beckn_key: "context.location.country.code",
          value: "session.country",
        },
        {
          beckn_key: "context.location.city.code",
          value: "session.cityCode",
        },
        {
          beckn_key: "context.transaction_id",
          value: "session.currentTransactionId",
        },
        {
          beckn_key: "context.message_id",
          value: "messageId",
        },
        {
          beckn_key: "context.timestamp",
          value: "timestamp",
        },
        {
          beckn_key: "context.domain",
          value: "session.domain",
        },
        {
          beckn_key: "context.version",
          value: "session.version",
        },
        {
          beckn_key: "context.ttl",
          value: "session.ttl",
        },
        {
          beckn_key: "context.action",
          value: "action",
        },
        {
          beckn_key: "message.update_target",
          value: "fulfillmentText",
        },
        {
          beckn_key: "message.order.id",
          value: "data.orderId",
        },
        {
          beckn_key: "message.order.fulfillments[0].state.descriptor.code",
          value: "data.fulfillmentStatus",
        },
      ],
    },
    on_search: {
      sessionData: [
        {
          business_key: "formId",
          extractionPath:
            "message.catalog.providers[].items[]{ id : xinput.form.id, itemId: id}",
        },
        {
          business_key: "providerId",
          extractionPath: "message.catalog.providers[]{id: id}",
        },
      ],
      mapping: [
        {
          business_key: "bpp_id",
          extractionPath: "context.bpp_id",
        },
        {
          business_key: "bpp_uri",
          extractionPath: "context.bpp_uri",
        },
        {
          business_key: "formData",
          extractionPath:
            "message.catalog.providers[]{providerId: id}.items[]{formUrl : xinput.form.url, id : xinput.form.id, itemId: id}",
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_select: {
      mapping: [
        {
          business_key: "providerId",
          extractionPath: "message.order.provider.id",
        },
        {
          business_key: "formData",
          extractionPath:
            "message.order.items[]{formUrl : xinput.form.url, id : xinput.form.id, itemId: id}",
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_init: {
      sessionData: [
        {
          business_key: "paymentID",
          extractionPath: "message.order.payments[]{id: id}",
        },
      ],
      mapping: [
        {
          business_key: "formData",
          extractionPath:
            "message.order.items[]{formUrl : xinput.form.url, id : xinput.form.id, itemId: id}",
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_confirm: {
      mapping: [
        {
          business_key: "orderId",
          extractionPath: "message.order.id",
        },
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_status: {
      mapping: [
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
    on_update: {
      mapping: [
        {
          business_key: "error",
          extractionPath: "error",
        },
      ],
    },
  },
};

module.exports = mapping;
