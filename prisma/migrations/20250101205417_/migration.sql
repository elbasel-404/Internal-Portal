-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientSecret" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RequestTableActiveTab" (
    "key" TEXT NOT NULL DEFAULT 'approvalRequests',
    "userId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "RequestTableActiveTab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HomePageSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "index" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 0,
    "slotType" TEXT NOT NULL DEFAULT 'homePage',
    CONSTRAINT "HomePageSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GeneralInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "index" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 0,
    "slotType" TEXT NOT NULL DEFAULT 'generalInfo',
    CONSTRAINT "GeneralInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Count" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clientSecret_key" ON "User"("clientSecret");

-- CreateIndex
CREATE UNIQUE INDEX "RequestTableActiveTab_userId_key" ON "RequestTableActiveTab"("userId");
